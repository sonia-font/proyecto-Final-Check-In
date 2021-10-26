import { getMode } from "./config.js"
import cacheEmpleados from './memoria/cacheEmpleados.js'
import cacheHoteles from './memoria/cacheHoteles.js'
import cacheHuespedes from './memoria/cacheHuespedes.js'
import cacheReservas from './memoria/cacheReservas.js'

let _empleados
let _hoteles
let _huespedes
let _reservas

switch (getMode()) {
    case 'PROD':
        const { crearMongoClient} = await import('./mongo/client.js')
        const { crearDbEmpleados } = await import('./mongo/dbEmpleados.js')
        const { crearDbHoteles } = await import('./mongo/dbHoteles.js')
        const { crearDbHuespedes } = await import('./mongo/dbHuespedes.js')        
        const { crearDbReservas } = await import('./mongo/dbReservas.js')
        const { getCnxStr } = await import('./config.js')
        const { getDBname } = await import('./config.js')

        const cnxStr = getCnxStr()
        const dbName = getDBname()
        const mongoClient = crearMongoClient(cnxStr,dbName)
        const db = await mongoClient.connect()
        await db.dropDatabase()
        const DbEmpleados = crearDbEmpleados(db)
        _empleados = DbEmpleados
        const DbHoteles = crearDbHoteles(db)
        _hoteles = DbHoteles
        const DbHuespedes = crearDbHuespedes(db)
        _huespedes = DbHuespedes
        const DbReservas = crearDbReservas(db)
        _reservas = DbReservas
        break;

    default:
        const CacheEmpleados = new cacheEmpleados()
        _empleados = CacheEmpleados
        const CacheHoteles = new cacheHoteles()
        _hoteles = CacheHoteles
        const CacheHuespedes = new cacheHuespedes()
        _huespedes = CacheHuespedes
        const CacheReservas = new cacheReservas()
        _reservas = CacheReservas
        break;
}

function getBaseEmpleados(){
    return _empleados
}

function getBaseHoteles(){
    return _hoteles
}

function getBaseHuespedes(){
    return _huespedes
}

function getBaseReservas(){
    return _reservas
}

export default{
    getBaseEmpleados,
    getBaseHoteles,
    getBaseHuespedes,
    getBaseReservas
}