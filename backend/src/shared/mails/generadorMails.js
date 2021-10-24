import nodemailer from 'nodemailer'
import path from 'path';
import createEmailBody from "./bodyConstructor.js"
const __dirname = path.resolve();

let transporter
const success = "Email Sent!"
const failure = "Email not sent"

function mailService({configEmail,configPass,configSubject,dirEmailBody}){
    return{
        initializeGmail: async() =>{
                transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: configEmail,
                    pass: configPass
                }
            })
        },

        initializeOtherMail: async(emailHost,emailPort) =>{
            transporter = nodemailer.createTransport({
                host: emailHost,
                port: emailPort,
                secure: false,
                auth: {
                    user: sendUsername,
                    pass: sendPass
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
        },
      
        send: async (email, replacement) => {
            const filePath = path.join(__dirname,dirEmailBody);
            const htmlToSend = await createEmailBody(filePath,replacement)
            let mailOptions = {
                from: transporter.sendUsername,
                to: email,
                subject: configSubject,
                html: htmlToSend
            }
            let result = success
            try{
                transporter.sendMail(mailOptions)
                return result
            }
            // Envia un codigo de error
            catch(error){
                console.log(error.errno)
                return result = failure
            }
              
        },

}}

export {
    mailService
}