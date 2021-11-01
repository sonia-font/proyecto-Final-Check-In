import GestorReservas from '../negocio/gestores/gestorReservas.js'
import Reserva from '../negocio/modelos/reserva.js'
import Estado from '../negocio/modelos/estado.js'

class ServicioReservas {

    constructor() {
        this.reservasManager = new GestorReservas()

    }
}

export default ServicioReservas