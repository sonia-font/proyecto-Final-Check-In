import Reserva from '../../modelos/reserva.js'

function crearDbReservas(db) {

  const dbReservas = db.collection('Huespedes')

  return {
    add: async (reserva) => {
        await dbReservas.insertOne(reserva)
        delete dbReservas._id
    },
    addUnique: async (reserva, codigo) => {
        const existe = await dbReservas.some(r => {
            return r[codigo] == reserva[codigo]
        })
        if(existe){
            return {added:0}
        }else{
            await dbReservas.push(reserva)
            return {added:1}
        }
    },
    getAll: async () => {
        const registros = await dbReservas.find({}).toArray()
        const reservas = await registros.map(r => {
            return new Reserva(r)
        })
        return reservas
      },
    getById: async (codigo) => {
        return await dbReservas.findOne({codigo:parseInt(codigo)})
    },    
    deleteById: async (codigo) => {
        const indiceParaBorrar = dbReservas.findIndex(r => r.codigo == codigo)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            await dbReservas.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    },
    updateById: async (reserva) => {
        const indiceParaReemplazar = dbReservas.findIndex(r => r.codigo == reserva.codigo)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            await dbReservas.splice(indiceParaReemplazar, 1, reserva)
            return {updated: 1}
        }
    },
    cerrar: async () => {
      console.log('cerrando gestor de reservas en mongo')
      await db.close()
    }
  }
}

export { crearDbReservas }
