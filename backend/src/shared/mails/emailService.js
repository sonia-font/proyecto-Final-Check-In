import {crearMailer} from "./Factory_Mailer.js"
import configMailer from "./config.js"

class EmailService {

    async sendCheckIn(email,codigo,nombre,hotel,inicioReserva){
        var config = configMailer.emailCheckIn
        const options = {
            dateStyle: 'medium',
            timeStyle: 'medium'
          }
        inicioReserva = new Date(inicioReserva).toLocaleString("es-AR", options)
        var datos = [codigo,nombre,inicioReserva,hotel]
        var mailer = crearMailer(config)
        await mailer.send(email, datos)
    }

    async sendInfo(email,nombre,habitacion){
        var config = configMailer.emailInfo
        var datos = [nombre,habitacion]
        var mailer = crearMailer(config)
        await mailer.send(email, datos)
    }
}

export default EmailService