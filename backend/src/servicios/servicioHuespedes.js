import GestorHuespedes from '../negocio/gestores/gestorHuespedes.js'
import Huesped from '../negocio/modelos/huesped.js'

class ServicioHuespedes {

    constructor() {
        this.huespedesManager = new GestorHuespedes()
    }

    async getById(id) {
        return this.huespedesManager.getById(id)
    }

    async updateById(huesped) {
        return await this.huespedesManager.updateById(huesped);
    }

    async deleteById(id) {
        return  await this.huespedesManager.deleteById(id);
    }
}

export default ServicioHuespedes