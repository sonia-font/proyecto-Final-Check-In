import Server from './shared/server/server.js'

async function main(){
    let server = await new Server().crearServidor(8000)

    var seeder = new Seeder()
    seeder.run()

    console.log(`Servidor listo en http://localhost:${server.port}/api`)
}

main()