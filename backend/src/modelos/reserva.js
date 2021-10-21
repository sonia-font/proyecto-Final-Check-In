let nextId = 0

class Reserva {    
    constructor(data){
        this.inicio = data.inicio
        this.fin = data.fin
        this.huesped = data.huesped
        this.estado = data.estado
        this.habitacion = data.habitacion
        this.codigo = nextId++   
    }
}

export default Reserva