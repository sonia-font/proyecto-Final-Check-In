import mongodb from 'mongodb'

function crearMongoClient(cnxStr,dbName) {
  const client = new mongodb.MongoClient(cnxStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return {
    connect: async () => {
      await client.connect()
      const db = client.db(dbName)
      return db
    },
    close: async () => {
      await client.close()
    }
  }
}

export { crearMongoClient }