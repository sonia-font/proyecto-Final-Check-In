import GestorHoteles from '../negocio/gestores/gestorHoteles.js'
import Hotel from '../negocio/modelos/hotel.js'
import Empleado from '../negocio/modelos/empleado.js'
import Reserva from '../negocio/modelos/reserva.js'
import Estado from '../negocio/modelos/estado.js'
import AxiosFiware from '../router/fiware.js'
import { getFiwareCNX } from '../router/config.js'

class ServicioHoteles {

    constructor() {
        this.hotelesManager = new GestorHoteles()
        this.fiwareService = new AxiosFiware(getFiwareCNX())
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
    * @param  {Reserva} datos La nueva reserva a agregar
    */
    async agregarReserva(id, datos) {
        try{  
            var hotel = await this.hotelesManager.getById(id)
            var reserva = new Reserva(datos)
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
        if(hotel.reservas.length > 0){
            do{
                const reserva = hotel.reservas[index]
                if(reserva.codigo == codigo){
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
    * @param  {Boolean} isWeb Si se esta mandando por la web o mobile
    * @param  {Object} data Contiene estado, foto, tipo, documento y habitacion
    * @param  {Estado} estado El estado a modificar
    */
    async actualizarReserva(id, codigo, isWeb, data, estado) {
        var hotel = await this.buscarPorId(id)
        var reservaEncontrada = null        
        var index = 0
    
        if(hotel.reservas.length > 0){

            do{
                const reserva = hotel.reservas[index]
                
                if(reserva.codigo == codigo){

                    if(estado === null){

                        //Update hecho por web
                        if(isWeb){
                            
                            if(data.documento){
                                //camino no feliz
                                reserva.huesped.foto = data.foto
                                reserva.huesped.tipo = data.tipo
                                reserva.huesped.documento = data.documento
                                reserva.habitacion = data.habitacion
                                reserva.estado = Estado.COMPLETO
                            }else{
                                //camino feliz
                                reserva.habitacion = data.habitacion
                            }                            

                        }else{
                            //Update hecho por app mobile
                            reserva.huesped.foto = data.foto
                            reserva.huesped.tipo = data.tipo
                            reserva.huesped.documento = data.documento
                            reserva.estado = Estado.COMPLETO
                        }
                        
                    }else{
                        //Update interno
                        reserva.estado = estado   
                    }

                    this.fiwareService.modifyEntity(hotel.id,reserva.codigo,reserva.estado)
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
        if(hotel.empleados.length > 0){
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
    * @param  {String} email El email del huesped    
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

    /**
    * Borra los datos del huesped de la reserva
    * @param  {Number} id El id del hotel a buscar
    * @param  {Number} codigo El codigo de la reserva a buscar  
    */
     async borrarHuesped(id, codigo){
        var reserva = await this.buscarReserva(id, codigo)

        if(reserva !== null){
            reserva.huesped = {}

            return true
        }

        return false
    }
}

export default ServicioHoteles