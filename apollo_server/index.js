const { ApolloServer } = require('apollo-server')
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { composeResolvers } = require('@graphql-tools/resolvers-composition');
import maintenanceDefs from './typeDefs/maintenance'
import reviewDefs from './typeDefs/review';
import Queries from './typeDefs/Query';
import maintenanceResolvers from './resolvers/maintenance';
import reviewsResolvers from './resolvers/reviews';
import mongoose from  'mongoose'

const DB_URL = process.env.MONGO_URL || 'mongodb://localhost/www'
const SERVER_URL = process.env.SERVER_URL || 'localhost'
const SERVER_PORT = 3000

const typeDefs = mergeTypeDefs([maintenanceDefs, reviewDefs, Queries])
const resolvers = composeResolvers([maintenanceResolvers, reviewsResolvers])

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
      host: SERVER_URL
    })
    console.log(`Server started at: ${url}`)
  }
}


const apolloServerOptions = {
  typeDefs,
  resolvers,
  playground: 'production' !== process.env.NODE_ENV,
  cors: true
}

const server = new Server(apolloServerOptions)

server.start()
