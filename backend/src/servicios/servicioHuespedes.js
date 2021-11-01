import GestorHuespedes from '../negocio/gestores/gestorHuespedes.js'
import Huesped from '../negocio/modelos/huesped.js'

class ServicioHuespedes {

    constructor() {
        this.huespedesManager = new GestorHuespedes()
    }
}

export default ServicioHuespedes