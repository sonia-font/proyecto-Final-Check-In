import Empleado from '../../negocio/modelos/empleado.js'

function crearDbEmpleados(db) {

  const dbEmpleados = db.collection('Empleados')

  return {
    add: async (empleado) => {
        await dbEmpleados.insertOne(empleado)
        delete dbEmpleados._id
    },
    addUnique: async (empleado, id) => {
        const existe = await dbEmpleados.some(e => {
            return e[id] == empleado[id]
        })
        if(existe){
            return {added:0}
        }else{
            await dbEmpleados.push(empleado)
            return {added:1}
        }
    },
    getAll: async () => {
        const registros = await dbEmpleados.find({}).toArray()
        const empleados = await registros.map(e => {
            return new Empleado(e)
        })
        return empleados
      },
    getById: async (id) => {
        return await dbEmpleados.findOne({id:parseInt(id)})
    },    
    deleteById: async (id) => {
        const indiceParaBorrar = dbEmpleados.findIndex(e => e.id == id)
        if (indiceParaBorrar == -1) {
            return {deleted: 0}                
        }else{
            await dbEmpleados.splice(indiceParaBorrar, 1)
            return {deleted: 1}
        }
    },
    updateById: async (empleado) => {
        const indiceParaReemplazar = dbEmpleados.findIndex(e => e.id == empleado.id)
        if(indiceParaReemplazar == -1){
            return {updated: 0}
        }else{
            await dbEmpleados.splice(indiceParaReemplazar, 1, empleado)
            return {updated: 1}
        }
    },
    cerrar: async () => {
      console.log('cerrando gestor de empleados en mongo')
      await db.close()
    }
  }
}

export { crearDbEmpleados }
