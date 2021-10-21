import Empleado from '../modelos/empleado.js'

class GestorEmpleados {

    constructor(baseEmpleados) {
        this.empleados = baseEmpleados
        //this.addTestData()
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

    async addTestData() {
        const self = this
                
        // self.add(new Empleado({
        //     ...
        // }))
    }
}

export default GestorEmpleados