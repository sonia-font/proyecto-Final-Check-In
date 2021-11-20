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
        const indiceParaBorrar = this.hoteles.findIndex(h => h.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            await this.hoteles.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    }
    
    async cerrar() {
        return console.log('cerrando gestor de hoteles en cache')
    }

    async updateById (hotel) {
        const indiceParaReemplazar = this.hoteles.findIndex(h => h.id == hotel.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            await this.hoteles.splice(indiceParaReemplazar, 1, hotel)
            return {updated: 1}
        }
    }
}

export default CacheHoteles