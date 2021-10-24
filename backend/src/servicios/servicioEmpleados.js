import GestorEmpleados from '../negocio/gestores/gestorEmpleados.js'

class ServicioEmpleados {

    constructor() {
        this.empleadosManager = new GestorEmpleados()
    }
}

export default ServicioEmpleados