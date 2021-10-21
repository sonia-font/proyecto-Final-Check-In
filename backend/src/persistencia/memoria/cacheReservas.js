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
}

export default CacheReservas