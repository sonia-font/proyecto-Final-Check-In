import dbFactory from '../../persistencia/dbFactory.js'

class GestorEmpleados {

    constructor() {
        this.empleados = dbFactory.getBaseEmpleados()
    }

    async add(empleado) {
        await this.empleados.add(empleado)
    }

    async getAll() {
        return await this.empleados.getAll()
    }

    async getById(id) {
        return await this.empleados.getById(id)
    }

    async delete(id) {
        await this.empleados.delete(id)
    }
}

export default GestorEmpleados