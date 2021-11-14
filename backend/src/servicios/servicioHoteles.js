import GestorHoteles from '../negocio/gestores/gestorHoteles.js'
import Hotel from '../negocio/modelos/hotel.js'
import Empleado from '../negocio/modelos/empleado.js'
import Reserva from '../negocio/modelos/reserva.js'
import Huesped from '../negocio/modelos/huesped.js'
import Estado from '../negocio/modelos/estado.js'

class ServicioHoteles {

    constructor() {
        this.hotelesManager = new GestorHoteles()
    }

    /**
    * Agrega un hotel
    * @param  {Hotel} hotel El hotel a agregar
    */
    async agregar(hotel) {
        try{    
            await this.hotelesManager.add(hotel)
        } catch (er) {
            throw new Error("No se pudo agregar al hotel. Posiblemente falten datos. ")
        }          
    }

    /**
    * Devuelve todos los hoteles
    */
    async buscarTodos() {
        return await this.hotelesManager.getAll()
    }

    /**
    * Devuelve un hotel por id
    * @param  {Number} id El id del hotel a buscar
    */
    async buscarPorId(id) {
        return await this.hotelesManager.getById(id)
    }

    /**
    * Devuelve un listado con nombre y id de todos los hoteles
    */
    async listar() {
        var hoteles = await this.hotelesManager.getAll()
        var listado = []

        hoteles.forEach(hotel => {
            listado.push({id: hotel.id, nombre: hotel.nombre})
        });

        return listado
    }

    /**
    * Elimina un hotel por id
    * @param  {Number} id El id del hotel a borrar
    */
    async borrar(id) {
        await this.hotelesManager.delete(id)
    }

    /**
    * Agrega una reserva al hotel por id
    * @param  {Number} id El id del hotel a buscar
    * @param  {Reserva} reserva La nueva reserva a agregar
    * @param  {Huesped} huesped El huesped de la reserva
    */
    async agregarReserva(id, reserva, huesped) {
        try{
            // TODO: Agregar un if que checkee si falta algun dato del huesped o la reserva  
            var hotel = await this.hotelesManager.getById(id)
            reserva.huesped = huesped
            hotel.reservas.push(reserva)
            await this.hotelesManager.updateById(hotel)
        }catch{
            throw new Error("No se pudo agregar la reserva. Posiblemente falten datos. ")
        } 
    }     

    /**
    * Devuelve una reserva por codigo
    * @param  {Number} id El id del hotel a buscar
    * @param  {Number} codigo El codigo de la reserva a buscar
    */
    async buscarReserva(id, codigo) {
        var hotel = await this.buscarPorId(id)
        var reservaEncontrada = null
        var index = 0
        if(hotel.reservas > 0){
            do{
                const reserva = hotel.reservas[index]
                if(reserva.codigo === codigo){
                    reservaEncontrada = reserva
                }
                index++
            } while (index < hotel.reservas.length && reservaEncontrada === null)
        }
        
        return reservaEncontrada
    } 

    /**
    * Devuelve una reserva actualizada
    * @param  {Number} id El id del hotel a buscar
    * @param  {Number} codigo El codigo de la reserva a buscar
    * @param  {Estado} estado Enum del estado de la reserva
    * @param  {String} foto La foto del huesped
    * @param  {String} tipo El tipo de documento
    * @param  {String} documento El numero de docuemnto
    * @param  {Number} habitacion El numero de habitacion
    */
    async actualizarReserva(id, codigo, estado, foto, tipo, documento, habitacion) {
        var hotel = await this.buscarPorId(id)
        var reservaEncontrada = null        
        var index = 0

        if(hotel.reservas > 0){

            do{
                const reserva = hotel.reservas[index]
                if(reserva.codigo === codigo){

                    if(foto !== null){
                        reserva.huesped.foto = foto
                        reserva.huesped.tipo = tipo
                        reserva.huesped.documento = documento
                        reserva.estado = Estado.COMPLETO

                    } else if (habitacion !== null){
                        reserva.habitacion = habitacion

                    } else if (estado !== null){
                        reserva.estado = estado   

                    }

                    this.hotelesManager.updateById(hotel)
                    reservaEncontrada = reserva
                }
                index++
            } while (index < hotel.reservas.length && reservaEncontrada === null)
        }        

        return reservaEncontrada
    }
    
    /**
    * Agrega un empleado al hotel por id
    * @param  {Number} id El id del hotel a buscar
    * @param  {Empleado} empleado El nuevo empleado a agregar
    */
    async agregarEmpleado(id, empleado) {
        try{
            // TODO: Agregar un if que checkee si falta algun dato del empleado  
            var hotel = await this.hotelesManager.getById(id)
            hotel.empleados.push(empleado)
            await this.hotelesManager.updateById(hotel)
        }catch{
            throw new Error("No se pudo agregar al empleado. Posiblemente falten datos. ")
        }        
    }

    /**
    * Indica si el empleado esta autorizado o no a usar la aplicacion
    * @param  {Number} id El id del hotel a buscar
    * @param  {String} email El email del empleado
    * @param  {String} password La password del empleado
    */
    async loginEmpleado(id, email, password){
        var hotel = await this.buscarPorId(id)
        var empleadoEncontrado = null
        var index = 0
        if(hotel.empleados > 0){
            do{
                const empleado = hotel.empleados[index]
                if(empleado.email === email && empleado.password === password){
                    empleadoEncontrado = empleado
                    return true
                }
                index++
            } while (index < hotel.empleados.length && empleadoEncontrado === null)
        }
        
        return false
    }

    /**
    * Indica si los datos del huesped coinciden con los de la reserva
    * @param  {Number} id El id del hotel a buscar
    * @param  {Number} codigo El codigo de la reserva a buscar
    * @param  {String} email El email del empleado    
    */
     async validarHuesped(id, codigo, email){
        var reserva = await this.buscarReserva(id, codigo)

        if(reserva !== null){
            if(reserva.huesped.email === email){
                
                return true
            }
        }
        
        return false
    }
}

export default ServicioHoteles