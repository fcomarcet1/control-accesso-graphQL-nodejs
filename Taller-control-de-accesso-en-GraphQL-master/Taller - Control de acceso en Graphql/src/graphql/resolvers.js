import tokenUtils from '../tools/tokenUtils';


const resolvers = function(queries) {
  return {

    Query: {
      login: (obj, {name, password}) => {
        // check user and generate Token
        const user = queries.login(name, password);
        if (user){
          return tokenUtils.generateToken(user.name, user.role);
        }

        throw 'Fallo el login';

      },
      getProfile: (obj, {name}, context) => {
        // obtenemos userInfo desde context que es valor que devolvimos en index.js en context()
        console.log(JSON.stringify(context));
      
        if(!context.userInfo){
          throw 'Permisos insuficientes';
        }

        const userInfo = context.userInfo;
        if (userInfo.user === name){
          const user = queries.getUser(name);
          return user;
        }

        throw 'No tienes acceso a este perfil';
      }
    },
    
    Mutation: {
      // change visibility content from private to public
      publicContent: (obj, {contentId}, context) => {

        if(!context.userInfo){
          throw 'Permisos insuficientes';
        }

        const userInfo = context.userInfo;
        if(userInfo.role !== 'TEACHER'){
          throw 'No tienes suficientes privilegios para hacer esto';
        }

        return queries.publicContent(contentId);

      }
    },
  }
}

export default resolvers;