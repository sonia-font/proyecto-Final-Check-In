import GestorHoteles from '../negocio/gestores/gestorHoteles.js'

class ServicioHoteles {

    constructor() {
        this.hotelesManager = new GestorHoteles()   
    }
}

export default ServicioHoteles