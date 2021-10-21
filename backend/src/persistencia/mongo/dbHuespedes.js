import Huesped from '../../modelos/huesped.js'

function crearDbHuespedes(db) {

  const dbHuespedes = db.collection('Huespedes')

  return {
    add: async (huesped) => {
        await dbHuespedes.insertOne(huesped)
        delete dbHuespedes._id
    },
    addUnique: async (huesped, id) => {
        const existe = await dbHuespedes.some(h => {
            return h[id] == huesped[id]
        })
        if(existe){
            return {added:0}
        }else{
            await dbHuespedes.push(huesped)
            return {added:1}
        }
    },
    getAll: async () => {
        const registros = await dbHuespedes.find({}).toArray()
        const huespedes = await registros.map(h => {
            return new Huesped(h)
        })
        return huespedes
      },
    getById: async (id) => {
        return await dbHuespedes.findOne({id:parseInt(id)})
    },    
    deleteById: async (id) => {
        const indiceParaBorrar = dbHuespedes.findIndex(h => h.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            await dbHuespedes.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    },
    updateById: async (huesped) => {
        const indiceParaReemplazar = dbHuespedes.findIndex(h => h.id == huesped.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            await dbHuespedes.splice(indiceParaReemplazar, 1, huesped)
            return {updated: 1}
        }
    },
    cerrar: async () => {
      console.log('cerrando gestor de huespedes en mongo')
      await db.close()
    }
  }
}

export { crearDbHuespedes }
