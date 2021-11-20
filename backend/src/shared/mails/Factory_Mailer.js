import {mailService} from "./generadorMails.js"
    
function crearMailer(emailConfig) {
    const generadorMails = mailService(emailConfig)
    generadorMails.initializeGmail()
    return generadorMails
}

export {crearMailer}