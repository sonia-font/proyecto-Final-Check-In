import GestorEmpleados from '../negocio/gestores/gestorEmpleados.js'
import Empleado from '../negocio/modelos/empleado.js'

class ServicioEmpleados {

    constructor() {
        this.empleadosManager = new GestorEmpleados()
    }

    /**
    * Agrega un empleado
    * @param  {Empleado} empleado El empleado a agregar
    */
    async agregar(empleado) {
        try{
            var nuevoEmpleado = new Empleado()
            nuevoEmpleado.nombre = empleado.nombre
            nuevoEmpleado.apellido = empleado.apellido
            nuevoEmpleado.email = empleado.email
            nuevoEmpleado.password = empleado.password
    
            await this.empleadosManager.add(nuevoEmpleado)
        } catch {
            throw new Error("No se pudo agregar al empleado. Posiblemente falten datos. ")
        }        
    }

    /**
    * Devuelve todos los empleados
    */
    async buscarTodos() {
        return await this.empleadosManager.getAll()
    }

    /**
    * Devuelve un empleado por id
    * @param  {Number} id El id del empleado a buscar
    */
    async buscarPorId(id) {
        return await this.empleadosManager.getById(id)
    }

    /**
    * Devuelve un empleado por email
    * @param  {String} email El email del empleado a buscar
    */
     async buscarPorEmail(email) {
        return await this.empleadosManager.getByEmail(email)
    }

    /**
    * Elimina un empleado por id
    * @param  {Number} id El id del empleado a borrar
    */
    async borrar(id) {
        await this.empleadosManager.delete(id)
    }
}

export default ServicioEmpleados