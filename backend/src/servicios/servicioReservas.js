import GestorReservas from '../negocio/gestores/gestorReservas.js'
import Reserva from '../negocio/modelos/reserva.js'
import Estado from '../negocio/modelos/estado.js'

class ServicioReservas {

    constructor() {
        this.reservasManager = new GestorReservas()

    }

    async popularBD(servicioHuespedes){
        const huesped1 = await servicioHuespedes.huespedesManager.getById(0)
        const huesped2 = await servicioHuespedes.huespedesManager.getById(1)
        const huesped3 = await servicioHuespedes.huespedesManager.getById(2)

        const reserva1 = new Reserva({
            inicio: new Date(2021,10,24),
            fin: new Date(2021,10,31),
            huesped: huesped1,
            estado: new Estado(),
        })

        const reserva2 = new Reserva({
            inicio: new Date(2021,10,23),
            fin: new Date(2021,10,30),
            huesped: huesped2,
            estado: new Estado(),
        })

        const reserva3 = new Reserva({
            inicio: new Date(2021,10,22),
            fin: new Date(2021,10,29),
            huesped: huesped3,
            estado: new Estado(),
        })

        await this.reservasManager.add(reserva1)
        await this.reservasManager.add(reserva2)
        await this.reservasManager.add(reserva3)
    }
    
}

export default ServicioReservas