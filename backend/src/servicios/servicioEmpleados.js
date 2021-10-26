import GestorEmpleados from '../negocio/gestores/gestorEmpleados.js'
import Empleado from '../negocio/modelos/empleado.js'

class ServicioEmpleados {

    constructor() {
        this.empleadosManager = new GestorEmpleados()
    }
    
    async popularBD(){
        const empleado1 = new Empleado({
            nombre: 'Juan',
            apellido: 'Perez',
            email: 'juanp@gmail.com',
            password: 'juanperez'
        })

        const empleado2 = new Empleado({
            nombre: 'Alfredo',
            apellido: 'Rodriguez',
            email: 'arodr@gmail.com',
            password: 'alfredito'
        })

        await this.empleadosManager.add(empleado1)
        await this.empleadosManager.add(empleado2)

    }
}

export default ServicioEmpleados