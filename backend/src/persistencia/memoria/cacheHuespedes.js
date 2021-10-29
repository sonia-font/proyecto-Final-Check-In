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

    async delete(id) {
        this.huespedes.delete((huesped) => huesped.id == id)
    }
    
    async cerrar() {
        return console.log('cerrando gestor de huespedes en cache')
    }

    async updateById (huesped) {
        const indiceParaReemplazar =  this.huespedes.findIndex(h => h.id == huesped.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            await dbHuespedes.splice(indiceParaReemplazar, 1, huesped)
            return {updated: 1}
        }
    }

}

export default CacheHuespedes