let nextId = 0

class Empleado {    
    constructor(data){
        this.nombre = data.nombre
        this.apellido = data.apellido
        this.email = data.email
        this.password = data.password
        this.id = nextId++   
    }
}

export default Empleado