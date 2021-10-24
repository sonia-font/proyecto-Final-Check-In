import GestorHuespedes from '../negocio/gestores/gestorHuespedes.js'

class ServicioHuespedes {

    constructor() {
        this.huespedesManager = new GestorHuespedes()
    }
}

export default ServicioHuespedes