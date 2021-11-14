import {crearMailer} from "./Factory_Mailer.js"
import configMailer from "./config.js"

class EmailService {

    async sendInfo(email, template){

        var config = configMailer.infoTemplate
        config.dirEmailBody = template
        var mailer = crearMailer(config)  

        await mailer.send(email, null)
    }

    async sendCheckIn(email, template){
        // TODO CONFIGURAR BIEN EL MAILER
    }

}

export default EmailService