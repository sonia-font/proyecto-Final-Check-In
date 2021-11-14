import dbFactory from '../../persistencia/dbFactory.js'

class GestorHoteles {

    constructor() {
        this.hoteles = dbFactory.getBaseHoteles() 
    }

    async add(hotel) {
        await this.hoteles.add(hotel)
    }

    async getAll() {
        return await this.hoteles.getAll()
    }

    async getById(id) {
        return await this.hoteles.getById(id)
    }

    async delete(id) {
        await this.hoteles.delete(id)
    }

    async updateById(hotel) {
        await this.hoteles.updateById(hotel)
    }
}

export default GestorHoteles