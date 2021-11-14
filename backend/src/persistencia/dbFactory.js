import { getMode } from "./config.js"
import cacheHoteles from './memoria/cacheHoteles.js'

let _hoteles

switch (getMode()) {
    case 'PROD':
        const { crearMongoClient} = await import('./mongo/client.js')
        const { crearDbHoteles } = await import('./mongo/dbHoteles.js')
        const { getCnxStr } = await import('./config.js')
        const { getDBname } = await import('./config.js')

        const cnxStr = getCnxStr()
        const dbName = getDBname()
        const mongoClient = crearMongoClient(cnxStr,dbName)
        const db = await mongoClient.connect()
        await db.dropDatabase()
        const DbHoteles = crearDbHoteles(db)
        _hoteles = DbHoteles
        break;

    default:
        const CacheHoteles = new cacheHoteles()
        _hoteles = CacheHoteles
        break;
}

function getBaseHoteles(){
    return _hoteles
}

export default{
    getBaseHoteles
}