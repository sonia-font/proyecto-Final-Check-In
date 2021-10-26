let nextId = 0

class Huesped {    
    constructor(data){
        this.nombre = data.nombre
        this.apellido = data.apellido
        this.email = data.email
        this.foto = data.foto
        this.id = nextId++
    }
}

export default Huesped