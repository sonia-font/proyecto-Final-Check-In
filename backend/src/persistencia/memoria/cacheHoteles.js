class CacheHoteles {    

    constructor() {
        this.hoteles = [];
    }

    async add(hotel) {
        this.hoteles.push(hotel)
    }

    async getAll() {
        return this.hoteles
    }

    async getById(id) {
        return this.hoteles.find((hotel) => hotel.id == id)
    }

    async delete(id) {
        this.hoteles.delete((hotel) => hotel.id == id)
    }
    
    async cerrar() {
        return console.log('cerrando gestor de hoteles en cache')
    }
}

export default CacheHoteles