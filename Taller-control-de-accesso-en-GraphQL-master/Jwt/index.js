const jwt = require('jsonwebtoken');

const token = jwt.sign({
  name: 'Paco'
}, process.env.SECRETO)

console.log(token)

const verificado = jwt.verify(token, process.env.SECRETO)

console.log(verificado)