import axios from 'axios'

class AxiosFiware {

    constructor(serverData){
        this.url = `${serverData}v2/entities`
    }

    addEntity(hotel) {   
        const headers = {
            "content-type":"application/json",
        }
        hotel.reservas.forEach(reserva => {
        const fiwareReservaId=`urn:ngsi-ld:Reserva:${hotel.id}${reserva.codigo}`
        const options = {
            dateStyle: 'medium',
            timeStyle: 'medium'
          }
        var body = {
            id:fiwareReservaId,
            type:"Reserva",
            hotelID:{
                type:"integer",
                value:hotel.id,
            },
            estadoReserva:{
                type:"text",
                value:reserva.estado
            },
            inicioReserva:{
                type:"text",
                value: new Date(reserva.inicio).toLocaleString("es-AR", options),
            },
            fechaCambio:{
                "type":"text",
                "value":new Date(reserva.inicio).toLocaleString("es-AR", options),
            }
        }
        body = JSON.stringify(body)
        axios.post(this.url,body,{
            headers:headers
            })
        })
    }

    modifyEntity(hotelId,reservaid,estado) {   
        const headers = {
            "content-type":"application/json",
        }

        const reservaAModificar=`${this.url}/urn:ngsi-ld:Reserva:${hotelId}${reservaid}/attrs`
        const options = {
            dateStyle: 'medium',
            timeStyle: 'medium'
          }
        var body = {
            estadoReserva:{
                type:"text",
                value:estado
            },
            fechaCambio:{
                "type":"text",
                "value":new Date().toLocaleString("es-AR", options),
            },
        }
        body = JSON.stringify(body)
        axios.patch(reservaAModificar,body,{
            headers:headers
        })
    }
    
}

export default AxiosFiware