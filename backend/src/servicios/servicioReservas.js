import GestorReservas from '../negocio/gestores/gestorReservas.js'
import Reserva from '../negocio/modelos/reserva.js'
import Estado from '../negocio/modelos/estado.js'

class ServicioReservas {

    constructor() {
        this.reservasManager = new GestorReservas()

    }

    async getByCode(id) {
        return this.reservasManager.getByCode(id);
    }

    async updateById(reserva) {
        return  await this.reservasManager.updateById(reserva);
    }
}

export default ServicioReservas