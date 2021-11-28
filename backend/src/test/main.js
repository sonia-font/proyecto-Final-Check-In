import AxiosClient from './AxiosClient.js'
import Server from '../shared/server/server.js'
import Seeder from './Seeder.js'
import envioMailCron from '../servicios/Cron/envioMailCron.js'
import ParseService from '../shared/parser/parseService.js'
import path from 'path'

async function main(){
    let server = await new Server().crearServidor(8000)
    let client = new AxiosClient(`http://localhost:${server.port}/api`)

    // TRAE UN HOTEL
    var hotel = await new Seeder().getHotel()
    
    // LO AGREGA
    const msg = await client.addHotel(hotel)
    console.log(msg.data.msg)

    // TRAE TODO
    const {data} = await client.getAll()
    console.log(data[0])

    // // TRAE UN BASE64 
    // let imagePath = path.join('./src/test/testImage/pintura.JPG')
    // let parser = new ParseService()
    // let testString = await parser.convertToBase64(imagePath)

    // var datos = {
    //     "foto": testString,
    //     "tipo": "DNI",
    //     "documento": "36359637",
    //     "habitacion": "12"
    // }

    // const dir = await client.updateReserva(data[0].id, data[0].reservas[0].codigo, datos)


    const cron = new envioMailCron();
    cron.correr()
}

main()

