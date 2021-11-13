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
            var nuevoHotel = new Hotel()
            nuevoHotel.nombre = hotel.nombre
            nuevoHotel.coordenada = hotel.coordenada
            nuevoHotel.template = hotel.template
            nuevoHotel.empleados = []
            nuevoHotel.reservas = []
    
            await this.hotelesManager.add(nuevoHotel)
        } catch {
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
    * Devuelve una reserva por codigo
    * @param  {Number} codigo El codigo de la reserva a buscar
    */
     async buscarReserva(codigo) {
        var hoteles = await this.buscarTodos()
        var reservaEncontrada = null
        var index = 0
        if(hoteles.length > 0){
            do{
                var subindex = 0
                const hotel = hoteles[index]
                if(hotel.reservas > 0){
                    do{
                        const reserva = hotel.reservas[subindex]
                        if(reserva.codigo == codigo){
                            reservaEncontrada = reserva
                        }
                        subindex++
                    } while (subindex < hotel.reservas.length)
                }
                index++
            } while (index < hoteles.length)
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
            var nuevoEmpleado = new Empleado()
            nuevoEmpleado.nombre = empleado.nombre
            nuevoEmpleado.apellido = empleado.apellido
            nuevoEmpleado.email = empleado.email
            nuevoEmpleado.password = empleado.password

            var hotel = await this.hotelesManager.getById(id)
            hotel.empleados.push(nuevoEmpleado)
            await this.hotelesManager.updateById(hotel)
        }catch{
            throw new Error("No se pudo agregar al empleado. Posiblemente falten datos. ")
        }        
    }

    /**
    * Agrega una reserva al hotel por id
    * @param  {Number} id El id del hotel a buscar
    * @param  {Reserva} reserva La nueva reserva a agregar
    * @param  {Huesped} huesped El huesped de la reserva
    */
    async agregarReserva(id, reserva, huesped) {
        try{
            var nuevaReserva = new Reserva()
            nuevaReserva.inicio = reserva.inicio
            nuevaReserva.fin = reserva.fin
            nuevaReserva.habitacion = null
            nuevaReserva.estado = new Estado()            

            var nuevoHuesped = new Huesped()
            nuevoHuesped.nombre = huesped.nombre
            nuevoHuesped.apellido = huesped.apellido
            nuevoHuesped.email = huesped.email
            nuevoHuesped.foto = ""

            nuevaReserva.huesped = nuevoHuesped

            var hotel = await this.hotelesManager.getById(id)
            hotel.reservas.push(nuevaReserva)
            await this.hotelesManager.updateById(hotel)
        }catch{
            throw new Error("No se pudo agregar la reserva. Posiblemente falten datos. ")
        } 
    }

    /**
    * Elimina un hotel por id
    * @param  {Number} id El id del hotel a borrar
    */
    async borrar(id) {
        await this.hotelesManager.delete(id)
    }

    /**
    * Devuelve una reserva actualizada
    * @param  {Number} codigo El codigo de la reserva a buscar
    * @param  {String} foto La foto del huesped
    * @param  {Number} habitacion El numero de habitacion
    */
    async actualizarReserva(codigo, foto, habitacion) {
        var hoteles = await this.buscarTodos()
        var reservaEncontrada = null        
        var index = 0
        if(hoteles.length > 0){

            do{
                var subindex = 0
                const hotel = hoteles[index]
                if(hotel.reservas > 0){

                    do{
                        const reserva = hotel.reservas[subindex]
                        if(reserva.codigo == codigo){

                            if(foto !== null){
                                reserva.huesped.foto = foto
                            } else if (habitacion !== null){
                                reserva.habitacion = habitacion
                            }

                            this.hotelesManager.updateById(hotel)
                            reservaEncontrada = reserva
                        }
                        subindex++
                    } while (subindex < hotel.reservas.length && reservaEncontrada === null)
                }
                index++
            } while (index < hoteles.length && reservaEncontrada === null)
        }

        return reservaEncontrada
    }
}

export default ServicioHoteles