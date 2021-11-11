class CacheHuespedes {    

    constructor() {
        this.huespedes = [];
    }

    async add(huesped) {
        this.huespedes.push(huesped)
    }

    async getAll() {
        return this.huespedes
    }

    async getById(id) {
        return this.huespedes.find((huesped) => huesped.id == id)
    }

    async deleteById(id) {
        return this.huespedes.delete((huesped) => huesped.id == id)
    }
    
    async cerrar() {
        return console.log('cerrando gestor de huespedes en cache')
    }

    async updateById (huesped) {
        const indiceParaReemplazar =  this.huespedes.findIndex(h => h.id == huesped.id)
        if(indiceParaReemplazar == -1){
            return false
        }else{
            await dbHuespedes.splice(indiceParaReemplazar, 1, huesped)
            return true
        }
    }

}

export default CacheHuespedes