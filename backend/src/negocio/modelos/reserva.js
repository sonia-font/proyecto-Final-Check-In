import Estado from './estado.js'

class Reserva {    
    constructor(data){
        this.inicio = data.inicio
        this.fin = data.fin
        this.huesped = data.huesped?? []
        this.estado = Estado.INACTIVO 
        this.habitacion = null
        this.codigo = null   
    }
}

export default Reserva