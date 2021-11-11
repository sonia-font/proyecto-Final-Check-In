import dbFactory from '../../persistencia/dbFactory.js'

class GestorHuespedes {

    constructor() {
        this.huespedes = dbFactory.getBaseHuespedes()
    }

    async add(huesped) {
        await this.huespedes.add(huesped)
    }

    async getAll() {
        return await this.huespedes.getAll()
    }

    async getById(id) {
        return await this.huespedes.getById(id)
    }

    async deleteById(id) {
        return await this.huespedes.deleteById(id)
    }

    async updateById(huesped) {
        return await this.huespedes.updateById(huesped)
    }
}

export default GestorHuespedes