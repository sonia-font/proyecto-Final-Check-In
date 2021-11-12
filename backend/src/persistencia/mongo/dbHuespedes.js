import Huesped from '../../negocio/modelos/huesped.js'

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
        const huesped = await dbHuespedes.findOne({id:parseInt(id)});
        
        if (huesped == undefined) {
            return false                
        }else{
            const respuesta = await dbHuespedes.deleteOne({"id":parseInt(id)});
            return true
        }
    },
    updateById: async (huesped) => {
        const huespedEncontrado = await dbHuespedes.findOne({id:parseInt(huesped.id)})
        if(huespedEncontrado == undefined){
            return false
        }else{
            const huespedId = huespedEncontrado.id;
            await dbHuespedes.updateOne({"id": huespedId},{ $set: huesped}, {upsert: false})
            return true
        }
    },
    cerrar: async () => {
      console.log('cerrando gestor de huespedes en mongo')
      await db.close()
    }
  }
}

export { crearDbHuespedes }
