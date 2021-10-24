import GestorReservas from '../negocio/gestores/gestorReservas.js'

class ServicioReservas {

    constructor() {
        this.reservasManager = new GestorReservas()   
    }
}

export default ServicioReservas