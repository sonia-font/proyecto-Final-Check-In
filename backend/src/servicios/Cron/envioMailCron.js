import cron from 'node-cron';
import ServicioHoteles from '../servicioHoteles.js';
import EmailService from '../../shared/mails/emailService.js';
import Estado from '../../negocio/modelos/estado.js'


class envioMailCron {

    constructor() {
        this.servHoteles = new ServicioHoteles();
        this.emailService = new EmailService();
    }

    /**
    * Itera cada 30min todos los hoteles 
    * y sus reservas correspondientes, para chequear si hay que mandar algun mail
    * 
    */
    correr(){
        cron.schedule('*/1 * * * * *', async() => {
            //get all hoteles
            let hoteles = await this.servHoteles.buscarTodos();

            if(hoteles != undefined){
                hoteles.forEach(hotel => {
                
                    const reservas = hotel.reservas;
                    const hotelId = 0; 

                    reservas.forEach(async(reserva) => {

                        if(reserva.estado == "inactivo") {
                            const fechaInicio = reserva.inicio;
                            const diffTiempo = this.calcularRestanteEnHoras(fechaInicio);

                            if(diffTiempo <= 24) {
                                await this.servHoteles.actualizarReserva(hotelId, reserva.codigo, null, null, Estado.INICIADO)
                                await this.emailService.sendCheckIn(reserva.huesped.email,reserva.codigo,reserva.huesped.nombre,hotel.nombre,reserva.inicio)
                            }

                        }
                        else if (reserva.estado == "procesado") {
                            
                            const fechaFin = reserva.fin;
                            const diffTiempo = this.calcularRestanteEnHoras(fechaFin);

                            if(diffTiempo <= 24) {
                                await this.servHoteles.actualizarReserva(hotelId, reserva.codigo, null, null, Estado.FINALIZADO)
                            }
                        }
                    })

                });
            }

        })
    }

    calcularRestanteEnHoras(tiempo){
        const reservaTiempo = new Date(tiempo);
        const fechaAhora = new Date();

        const resta = reservaTiempo.getTime() - fechaAhora.getTime();
        const diffHoras = Math.round(resta / (1000 * 60 * 60));

        return diffHoras;

    }
}

export default envioMailCron