import GestorHoteles from '../negocio/gestores/gestorHoteles.js'
import Hotel from '../negocio/modelos/hotel.js'

class ServicioHoteles {

    constructor() {
        this.hotelesManager = new GestorHoteles()
    }

    async popularBD(servicioEmpleados,servicioReservas){
        const dir = process.cwd()
        const empleados = await servicioEmpleados.empleadosManager.getAll()
        const reservas = await servicioReservas.reservasManager.getAll()
        const hotel1 = new Hotel({
            empleados: empleados,
            reservas: reservas,
            nombre: 'Hotel Test',
            template: dir + "/src/shared/mails/cuerposMail/templateHotel.html",
            coordenada: "-34.603619642973996, -58.381688419326416"
        })

        await this.hotelesManager.add(hotel1)
    }
}

export default ServicioHoteles