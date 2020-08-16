const { ApolloServer } = require('apollo-server')
import typeDefs from './typeDefs/maintenance.js'
import resolvers from './resolvers/maintenance';

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
