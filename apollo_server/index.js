import Maintenance from './mongo/maintenanceShema';

const { ApolloServer } = require('apollo-server')
import typeDefs from './typeDefs/maintenance'
import resolvers from './resolvers/maintenance';


const mongoose = require('mongoose')

const DB_URL = 'mongodb://mongo.automagistre.local/www'
const SERVER_URL = 'localhost'
const SERVER_PORT = 3000

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true } )
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=> console.log('DB connected'))

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


const test = async () => {
  const res = await Maintenance.findOne({
    'vehicle.caseName': 'J10',
    'vehicle.manufacturer.name': 'Nissan'
  }).exec()
  console.log(res.engine)
}

test()
