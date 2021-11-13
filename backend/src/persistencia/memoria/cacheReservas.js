class CacheReservas {    

    constructor() {
        this.reservas = [];
    }

    async add(reserva) {
        this.reservas.push(reserva)
    }

    async getAll() {
        return this.reservas
    }

    async getById(id) {
        return this.reservas.find((reserva) => reserva.codigo == id)
    }

    async delete(id) {
        this.reservas.delete((reserva) => reserva.codigo == id)
    }
    
    async cerrar() {
        return console.log('cerrando gestor de reservas en cache')
    }

    async updateById (reserva) {
        const indiceParaReemplazar = this.reservas.findIndex(h => h.id == reserva.codigo)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            await this.reservas.splice(indiceParaReemplazar, 1, reserva)
            return {updated: 1}
        }
    }
}

export default CacheReservas