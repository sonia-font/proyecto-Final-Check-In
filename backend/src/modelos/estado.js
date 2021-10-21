import EstadoInactivo from "./estados/inactivo.js";

class Estado {    
    constructor(){
        this.estadoActual = new EstadoInactivo(this)
    }    

    async iniciar(){
        this.estadoActual.iniciar();
    }

    async cambiar(nuevoEstado){
        this.estadoActual = nuevoEstado;
        this.iniciar()
    }     
}

export default Estado