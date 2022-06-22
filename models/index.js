

const Categoria = require('../models/categoria');   //importar el modelo de categoria 
const Roles = require('../models/roles');   //importar el modelo de roles           
const Usuario = require('../models/users');   //importar el modelo de usuario
const Server = require('../models/server');   //importar el modelo de producto
const Producto = require('../models/producto');   //importar el modelo de producto


module.exports = {  //exportar el modulo     
    Categoria,
    Producto,
    Roles,
    Server,
    Usuario,
    
    
}
