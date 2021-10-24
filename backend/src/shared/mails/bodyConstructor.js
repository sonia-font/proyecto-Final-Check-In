import handlebars from 'handlebars'
import fs from 'fs/promises'

async function createEmailBody (filePath, HTMLreplacement){
    const source = await fs.readFile(filePath, 'utf-8');
    const template = handlebars.compile(source);
    const htmlToSend = template(HTMLreplacement)
    return htmlToSend
}

export default createEmailBody