class Huesped {    
    constructor(data){
        this.nombre = data.nombre
        this.apellido = data.apellido
        this.email = data.email
        this.foto = data.foto?? ""
        this.tipo = data.tipo?? ""
        this.documento = data.documento?? ""
    }
}

export default Huesped