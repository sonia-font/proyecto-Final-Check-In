import Estado from './estado.js'

let nextId = 0

class Reserva {    
    constructor(data){
        this.inicio = data.inicio
        this.fin = data.fin
        this.huesped = data.huesped
        this.estado = data.estado?? Estado.INACTIVO 
        this.habitacion = data.habitacion?? null
        this.codigo = nextId++     
    }
}

export default Reserva