import path from 'path'
import imageToBase64 from 'image-to-base64'
import base64ToImage from 'base64-to-image'
import crypto from 'crypto'

class ParseService {    

    async convertToBase64(path){
        try{
            return imageToBase64(path)
        } catch(er) {
            console.log(er)
        } 
    }

    async convertToImage(baseString){
        // Generate random string            
        var seed = crypto.randomBytes(20)
        var uniqueSHA1String = crypto.createHash('sha1').update(seed).digest('hex')
        var uniqueRandomImageName = 'image-' + uniqueSHA1String

        var imageType = 'png'
        var newPath = path.join('./src/uploads/')
        var optionalObj = {'fileName': uniqueRandomImageName, 'type': imageType}

        var base64Str = "data:image/jpg;base64," + baseString
            
        base64ToImage(base64Str,newPath,optionalObj)

        return newPath + uniqueRandomImageName + '.' + imageType
    }  
}

export default ParseService