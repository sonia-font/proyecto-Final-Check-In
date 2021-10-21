import Hotel from '../modelos/hotel.js'

class GestorHoteles {

    constructor(baseHoteles) {
        this.hoteles = baseHoteles
        //this.addTestData()
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

    async addTestData() {
        const self = this
                
        // self.add(new Hotel({
        //     ...
        // }))
    }
}

export default GestorHoteles