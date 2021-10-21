import Huesped from '../modelos/huesped.js'

class GestorHuespedes {

    constructor(baseHuespedes) {
        this.huespedes = baseHuespedes
        //this.addTestData()
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

    async delete(id) {
        await this.huespedes.delete(id)
    }

    async addTestData() {
        const self = this
                
        // self.add(new Huesped({
        //     ...
        // }))
    }
}

export default GestorHuespedes