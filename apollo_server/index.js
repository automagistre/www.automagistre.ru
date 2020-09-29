const { ApolloServer } = require('apollo-server')
import typeDefs from './typeDefs/maintenance'
import resolvers from './resolvers/maintenance';
import mongoose from  'mongoose'

const DB_URL = 'mongodb://mongo.automagistre.local/www'
const SERVER_URL = 'test.kach.su'
const SERVER_PORT = 3000

class Server {

  constructor(apolloServerOptions) {
    this.apolloServer = new ApolloServer(apolloServerOptions)
  }

  async start () {
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', ()=> console.log('DB connected'))

    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true } )

    const {url} = await this.apolloServer.listen({
      port: SERVER_PORT,
      // host: SERVER_URL
    })
    console.log(`Server started at: ${url}`)
  }
}


const apolloServerOptions = {
  typeDefs,
  resolvers,
  playground: true,
  cors: true
}

const server = new Server(apolloServerOptions)

server.start()
