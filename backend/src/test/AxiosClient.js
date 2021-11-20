import axios from 'axios'

class AxiosClient {

    constructor(serverData){
        this.url = serverData
    }

    async addHotel(hotel) {   
        var self = this
        return await self.sendRequest({ url: this.url + '/hotel/crear', method: 'post', data: hotel  })
    }  

    async getAll() {   
        var self = this
        return await self.sendRequest({ url: this.url + '/hoteles', method: 'get' })
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

