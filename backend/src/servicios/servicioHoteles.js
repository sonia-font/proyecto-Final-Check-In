import GestorHoteles from '../negocio/gestores/gestorHoteles.js'
import Hotel from '../negocio/modelos/hotel.js'

class ServicioHoteles {

    constructor() {
        this.hotelesManager = new GestorHoteles()
    }
}

export default ServicioHoteles