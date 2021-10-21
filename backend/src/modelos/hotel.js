let nextId = 0

class Hotel {    
    constructor(data){
        this.empleados = data.empleados
        this.reservas = data.reservas
        this.nombre = data.nombre
        this.template = data.template
        this.coordenada = data.coordenada
        this.id = nextId++   
    }
}

export default Hotel