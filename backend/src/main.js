import Server from './shared/server/server.js'
import Seeder from './test/Seeder.js'
import envioMailCron from './servicios/Cron/envioMailCron.js'


async function main(){
    let server = await new Server().crearServidor(8000)

    var seeder = new Seeder()
    seeder.run()

    const cron = new envioMailCron();
    cron.correr()

    console.log(`Servidor listo en http://localhost:${server.port}/api`)
}

main()