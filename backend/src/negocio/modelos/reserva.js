import Estado from './estado.js'

let nextId = 0

class Reserva {    
    constructor(data){
        this.inicio = data.inicio
        this.fin = data.fin
        this.huesped = data.huesped
        this.estado = Estado.INACTIVO 
        this.habitacion = null
        this.codigo = nextId++     
    }
}

export default Reserva