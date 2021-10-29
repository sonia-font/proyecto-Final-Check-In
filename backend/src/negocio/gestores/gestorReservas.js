import dbFactory from '../../persistencia/dbFactory.js'

class GestorReservas {

    constructor() {
        this.reservas = dbFactory.getBaseReservas()
    }

    async add(reserva) {
        await this.reservas.add(reserva)
    }

    async getAll() {
        return await this.reservas.getAll()
    }

    async getByCode(codigo) {
        return await this.reservas.getById(codigo)
    }

    async delete(codigo) {
        await this.reservas.delete(codigo)
    }
    
    async updateById(reserva) {
        await this.reservas.updateById(reserva)
    }
}

export default GestorReservas