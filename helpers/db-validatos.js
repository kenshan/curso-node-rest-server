const Roles = require('../models/Roles');
const Usuario = require('../models/users');

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

module.exports = {
    esRolValido,
    emailValido,
    existeUsuarioId
}