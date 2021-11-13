class CacheEmpleados {    

    constructor() {
        this.empleados = [];
    }

    async add(empleado) {
        this.empleados.push(empleado)
    }

    async getAll() {
        return this.empleados
    }

    async getById(id) {
        return this.empleados.find((empleado) => empleado.id == id)
    }

    async getByEmail(email) {
        return this.empleados.find((empleado) => empleado.email == email)
    }

    async delete(id) {
        this.empleados.delete((empleado) => empleado.id == id)
    }
    
    async cerrar() {
        return console.log('cerrando gestor de empleados en cache')
    }
}

export default CacheEmpleados