import fs from 'fs'
import path from 'path'
import formidable from 'formidable'

class ParseService {    

    async parseForm(req){
        var self = this
        return new Promise((resolve, reject) => {
            try {
                const form = new formidable.IncomingForm();
    
                form.parse(req, function(err, fields, files){
                    var oldPath = files.image.filepath;
                    var newPath = path.join('./src/uploads') + '/'+files.image.originalFilename
                    var rawData = fs.readFileSync(oldPath)
            
                    self.uploadImage(newPath, rawData)  

                    var datos = {
                        tipo: fields.tipo,
                        documento: fields.documento,
                        foto: newPath
                    } 
                    
                    resolve(datos)
                })
            } catch (err) {
                reject(new Error('Error al subir la foto'))
            }
        })        
    }    

    async uploadImage(newPath, rawData){
        fs.writeFile(newPath, rawData, function(err){
            if(err) {
                console.log(err)
            } else {
                console.log("Foto Guardada")
            }
        })
    }
}

export default ParseService