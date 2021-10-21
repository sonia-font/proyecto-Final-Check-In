import express from 'express'
import Router from '../../router/router.js'

class Server {

    constructor(){
        this.router = new Router().createRouter()
    }

    crearServidor(port){
        const app = express()
        app.use(express.json())
        app.use('/api', this.router)

        return new Promise((resolve, reject) => {
            const server = app.listen(port)
                .once('error', (err) => {
                    reject(new Error('error al conectarse al servidor'))
                })
                .once('listening', () => {
                    console.log('Listening on port ' + server.address().port)
                    server.port = server.address().port
                    resolve(server)
                })
        })
    }
}

export default Server
