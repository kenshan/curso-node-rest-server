const Roles = require('../models/roles');
const {Usuario , Categoria, Producto} = require('../models');

const esRolValido = async (rol = "")=>{

    const existeRole = await Roles.findOne({role:rol});

    if(!existeRole){
        throw new Error(`el rol ${rol} no existe`);
    }
}


const emailValido= async (correo ="")=>{
     //verificar el correo
     const existeEmail = await Usuario.findOne({correo});

     if( existeEmail ){
        throw new Error(`el email ${correo} ya existe`);
    }
}

const existeUsuarioId= async (id="")=>{
    //verificar el correo
    const existeId = await Usuario.findById(id);

    if( !existeId ){
       throw new Error(`el id ${id} no existe`);
   }
}


const existeCategoria = async(id) => {

    const categoria = await Categoria.findById(id);
    if (!categoria) {
        throw new Error(`la categoria con id ${id} no existe`);
    }
   

}

const existeProducto = async(id) => {

    const producto = await Producto.findById(id);
    if (!producto) {
        throw new Error(`la producto con id ${id} no existe`);
    }
   

}

module.exports = {
    esRolValido,
    emailValido,
    existeUsuarioId,
    existeCategoria,
    existeProducto
}