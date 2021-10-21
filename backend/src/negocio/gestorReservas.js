import Reserva from '../modelos/reserva.js'

class GestorReservas {

    constructor(baseReservas) {
        this.reservas = baseReservas
        //this.addTestData()
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

    async addTestData() {
        const self = this
                
        // self.add(new Reserva({
        //     ...
        // }))
    }
}

export default GestorReservas