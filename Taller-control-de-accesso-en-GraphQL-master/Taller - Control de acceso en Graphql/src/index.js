import {ApolloServer} from 'apollo-server';
import { queries } from './db';
import {typeDefs} from './graphql';
import {resolvers as generaterResolvers} from './graphql';
import tokenUtils from './tools/tokenUtils';

const resolvers = generaterResolvers(queries);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // jwt authorization
  context: ({req}) => {
    // get token from headers
    const token = req.headers.authorization
    if (token){
      // check token is valid
      const userInfo = tokenUtils.getAll(token);
      console.log(JSON.stringify(userInfo));
      // con este return podremos acceder en los resolvers mediante context a este valor
      return {userInfo};
    }
  }
});


server.listen()
  .then(({url}) => {
    console.log(`Iniciado servidor en ${url}`);
});