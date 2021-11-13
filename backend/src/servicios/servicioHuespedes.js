import GestorHuespedes from '../negocio/gestores/gestorHuespedes.js'
import Huesped from '../negocio/modelos/huesped.js'

class ServicioHuespedes {

    constructor() {
        this.huespedesManager = new GestorHuespedes()
    }

    /**
    * Agrega un huesped
    * @param  {Huesped} huesped El huesped a agregar
    */
    async agregar(huesped) {
        try{
            var nuevoHuesped = new Huesped()
            nuevoHuesped.nombre = huesped.nombre
            nuevoHuesped.apellido = huesped.apellido
            nuevoHuesped.email = huesped.email
            nuevoHuesped.foto = ""
    
            await this.huespedesManager.add(nuevoHuesped)
        } catch {
            throw new Error("No se pudo agregar al huesped. Posiblemente falten datos. ")
        }          
    }

    /**
    * Devuelve todos los huespedes
    */
    async buscarTodos() {
        return await this.huespedesManager.getAll()
    }

    /**
    * Devuelve un huesped por id
    * @param  {Number} id El id del huesped a buscar
    */
    async buscarPorId(id) {
        return await this.huespedesManager.getById(id)
    }

    /**
    * Elimina un huesped por id
    * @param  {Number} id El id del huesped a borrar
    */
    async borrar(id) {
        await this.huespedesManager.delete(id)
    }

    /**
    * Actualiza la foto del huesped
    * @param  {Number} idHuesped El id del huesped a actualizar
    * @param  {String} foto La ubicacion de la foto en servidor
    */
    async actualizarFoto(idHuesped, foto) {
        var huesped = this.buscarPorId(idHuesped)
        huesped.foto = foto
        await this.huespedesManager.updateById(huesped)
    }
}

export default ServicioHuespedes