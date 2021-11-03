import axios from 'axios'

class AxiosClient {

    constructor(serverData){
        this.url = serverData
    }

    async addEmpleado(empleado) {   
        var self = this
        return await self.sendRequest({ url: this.url + '/crear/empleado', method: 'post', data: empleado })
    }

    async addHuesped(huesped) {
        var self = this
        return await self.sendRequest({ url: this.url + '/crear/huesped', method: 'post', data: huesped  })
    }

    async addReserva(reserva) {   
        var self = this
        return await self.sendRequest({ url: this.url + '/crear/reserva', method: 'post', data: reserva  })
    }

    async addHotel(hotel) {   
        var self = this
        return await self.sendRequest({ url: this.url + '/crear/hotel', method: 'post', data: hotel  })
    }

    async sendRequest(req) {
        try {
            return await axios(req)
        } catch (error) {
            if (error.response) {
                const NE = new Error(`error ${error.response.status} enviado desde el servidor: ${error.response.data.message}`)
                NE.status = error.response.status
                NE.message = error.response.data.message
                throw NE
            } else {
                throw new Error('error al enviar la peticion')
            }
        }
    }
}

export default AxiosClient

