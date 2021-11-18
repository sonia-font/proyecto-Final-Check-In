import Hotel from '../../negocio/modelos/hotel.js'

function crearDbHoteles(db) {

  const dbHoteles = db.collection('Hoteles')

  return {
    add: async (hotel) => {
        await dbHoteles.insertOne(hotel)
        delete dbHoteles._id
    },
    addUnique: async (hotel, id) => {
        const existe = await dbHoteles.some(h => {
            return h[id] == hotel[id]
        })
        if(existe){
            return {added:0}
        }else{
            await dbHoteles.push(hotel)
            return {added:1}
        }
    },
    getAll: async () => {
        const registros = await dbHoteles.find({}).toArray()
        const hoteles = await registros.map(h => {
            return new Hotel(h)
        })
        return hoteles
      },
    getById: async (id) => {
        return await dbHoteles.findOne({id:parseInt(id)})
    },    
    deleteById: async (id) => {
        const indiceParaBorrar = dbHoteles.findIndex(h => h.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            await dbHoteles.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    },
    updateById: async (hotel) => {
        const hotelActualizar = await dbHoteles.findOne({id: parseInt(hotel.id)})
       
        if(hotelActualizar == undefined){
            return {updated: 0}
        }else{
            const indiceParaReemplazar = hotelActualizar.id
            await dbHoteles.updateOne({"id" :indiceParaReemplazar},{ $set: hotel}, {upsert: false})
            return {updated: 1}
        }
    },
    cerrar: async () => {
      console.log('cerrando gestor de hoteles en mongo')
      await db.close()
    }
  }
}

export { crearDbHoteles }
