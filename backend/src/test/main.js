import AxiosClient from './AxiosClient.js'
import Server from '../shared/server/server.js'
import Seeder from './Seeder.js'

async function main(){
    let server = await new Server().crearServidor(8000)
    let client = new AxiosClient(`http://localhost:${server.port}/api`)

    var hotel = await new Seeder().getHotel()
    
    const msg = await client.addHotel(hotel)
    console.log(msg.data.msg)

    const {data} = await client.getAll()
    console.log(data[0])
}

main()

