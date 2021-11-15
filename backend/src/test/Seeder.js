import ServicioHoteles from '../servicios/servicioHoteles.js'
import Huesped from '../negocio/modelos/huesped.js'
import Empleado from '../negocio/modelos/empleado.js'
import Reserva from '../negocio/modelos/reserva.js'
import Hotel from '../negocio/modelos/hotel.js'
import Estado from '../negocio/modelos/estado.js'

class Seeder {

    constructor(){
        this.servHoteles = new ServicioHoteles()  
    }

    async run(){
        var hotel = await this.getHotel()
        this.servHoteles.agregar(hotel)
    }

    async getHotel(){

        const empleado1 = new Empleado({
            nombre: 'Juan',
            apellido: 'Perez',
            email: 'juanp@gmail.com',
            password: 'juanperez'
        })
    
        const empleado2 = new Empleado({
            nombre: 'Alfredo',
            apellido: 'Rodriguez',
            email: 'arodr@gmail.com',
            password: 'alfredito'
        })
    
        const huesped1 = new Huesped({
            nombre: 'Gaston',
            apellido: 'Gonzalez',
            email: 'gaston-gp93@live.com.ar',
        })
    
        const huesped2 = new Huesped({
            nombre: 'Sonia',
            apellido: 'Font',
            email: 'sonia@gmail.com',
        })
    
        const huesped3 = new Huesped({
            nombre: 'Gilberto',
            apellido: 'Materano',
            email: 'gmater@gmail.com',
        })
    
        const huesped4 = new Huesped({
            nombre: 'Daniel',
            apellido: 'Getti',
            email: 'dg@gmail.com',
        })
    
        const reserva1 = new Reserva({
            inicio: new Date(2021,10,24),
            fin: new Date(2021,10,31),
            huesped: huesped1,
            estado: Estado.INACTIVO,
        })
    
        const reserva2 = new Reserva({
            inicio: new Date(2021,10,23),
            fin: new Date(2021,10,30),
            huesped: huesped2,
            estado: Estado.INACTIVO,
        })
    
        const reserva3 = new Reserva({
            inicio: new Date(2021,10,22),
            fin: new Date(2021,10,29),
            huesped: huesped3,
            estado: Estado.INACTIVO,
        })
    
        const reserva4 = new Reserva({
            inicio: new Date(2021,10,21),
            fin: new Date(2021,10,28),
            huesped: huesped4,
            estado: Estado.INACTIVO,
        })
    
        const dir = process.cwd()
        const empleados = [empleado1,empleado2]
        const reservas = [reserva1,reserva2,reserva3,reserva4]
    
        const hotel = new Hotel({
            empleados: empleados,
            reservas: reservas,
            nombre: 'Hotel Test',
            template: dir + "/src/shared/mails/cuerposMail/templateHotel.html",
            coordenada: "-34.603619642973996, -58.381688419326416"
        })

        return hotel
    }
}

export default Seeder