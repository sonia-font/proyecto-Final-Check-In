import GestorEmpleados from '../negocio/gestores/gestorEmpleados.js'
import Empleado from '../negocio/modelos/empleado.js'

class ServicioEmpleados {

    constructor() {
        this.empleadosManager = new GestorEmpleados()
    }
}

export default ServicioEmpleados