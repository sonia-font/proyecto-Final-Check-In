import GestorReservas from '../negocio/gestores/gestorReservas.js'
import ServicioHuespedes from '../servicios/servicioHuespedes.js'
import Reserva from '../negocio/modelos/reserva.js'
import Estado from '../negocio/modelos/estado.js'
import EstadoCancelado from '../negocio/modelos/estados/cancelado.js'
import EstadoCompleto from '../negocio/modelos/estados/completo.js'
import EstadoFinalizado from '../negocio/modelos/estados/finalizado.js'
import EstadoIniciado from '../negocio/modelos/estados/iniciado.js'
import EstadoPago from '../negocio/modelos/estados/pago.js'

class ServicioReservas {

    constructor() {
        this.reservasManager = new GestorReservas()
        this.servicioHuespedes = new ServicioHuespedes()
    }

    /**
    * Agrega una reserva
    * @param  {Reserva} reserva La reserva a agregar
    * @param  {Number} idHuesped El id del huesped que hace la reserva
    */
    async agregar(reserva, idHuesped) {
        try{
            var nuevaReserva = new Reserva()
            nuevaReserva.inicio = reserva.inicio
            nuevaReserva.fin = reserva.fin
            nuevaReserva.habitacion = null
            nuevaReserva.estado = new Estado()

            var huesped = this.servicioHuespedes.buscarPorId(idHuesped)
            nuevaReserva.huesped = huesped
    
            await this.reservasManager.add(nuevaReserva)
        } catch {
            throw new Error("No se pudo agregar la reserva. Posiblemente falten datos. ")
        }          
    }

    /**
    * Devuelve todas las reservas
    */
    async buscarTodos() {
        return await this.reservasManager.getAll()
    }

    /**
    * Devuelve una reserva por codigo
    * @param  {Number} codigo El codigo de la reserva a buscar
    */
    async buscarPorCodigo(codigo) {
        return await this.reservasManager.getByCode(codigo)
    }

    /**
    * Elimina los datos sensibles de una reserva por codigo
    * @param  {Number} codigo El codigo de la reserva
    */
    async borrarDatos(codigo) {
        var reserva = this.buscarPorCodigo(codigo)
        reserva.huesped = null

        await this.reservasManager.updateByCode(reserva)
    }
    
    /**
    * Actualiza la habitacion de la reserva
    * @param  {Number} codigo El codigo de la reserva
    * @param  {Number} habitacion La habitacion asignada
    */
    async actualizarHabitacion(codigo, habitacion) {
        var reserva = this.buscarPorCodigo(codigo)
        reserva.habitacion = habitacion

        await this.reservasManager.updateByCode(reserva)
    }

    /**
    * Actualiza la habitacion de la reserva
    * @param  {Number} codigo El codigo de la reserva
    * @param  {String} estado El nuevo estado
    */
    async actualizarEstado(codigo, estado) {
        var nuevoEstado
        switch(estado){
            case "cancelado":
                nuevoEstado = new EstadoCancelado()
                break;
            case "completo":
                nuevoEstado = new EstadoCompleto()
                break;
            case "finalizado":
                nuevoEstado = new EstadoFinalizado()
                break;
            case "iniciado":
                nuevoEstado = new EstadoIniciado()
                break;
            case "pago":
                nuevoEstado = new EstadoPago()
                break;
            default:
                throw new Error("Estado invalido")
        }

        var reserva = this.buscarPorCodigo(codigo)
        reserva.estado.cambiar(nuevoEstado)

        await this.reservasManager.updateByCode(reserva)
    }
}

export default ServicioReservas