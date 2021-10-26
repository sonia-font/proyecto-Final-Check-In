import GestorHuespedes from '../negocio/gestores/gestorHuespedes.js'
import Huesped from '../negocio/modelos/huesped.js'

class ServicioHuespedes {

    constructor() {
        this.huespedesManager = new GestorHuespedes()
    }

    async popularBD(){
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

        await this.huespedesManager.add(huesped1)
        await this.huespedesManager.add(huesped2)
        await this.huespedesManager.add(huesped3)
    }

}

export default ServicioHuespedes