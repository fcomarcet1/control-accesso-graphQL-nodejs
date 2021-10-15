import jwt from 'jsonwebtoken';

const tokenUtils = {

  // check if token is valid
  getAll: (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  },
  // get user from token
  getUser: (token) => {
    return getAll(token)['user'];
  },
   // get role from token
  getRole: (token) => {
    return getAll(token)['role'];
  },

   // Create token
  generateToken: (user, role) => {
    return jwt.sign({
      user,
      role
    },
    process.env.TOKEN_SECRET);
  }

}

export default tokenUtils;