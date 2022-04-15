const {response} = require('express');
const bcryptjs= require('bcryptjs');


const Usuario = require('../models/users');

const usuariosGet = async(req, res= response) => {
    // const {q,nombre="no name",apykey} = req.query;
    const query={ estado: true};
    const {limite = 5, desde = 0} = req.query;
    // const usuarios = await Usuario.find(query)
    // .skip(desde)
    // .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(desde)
        .limit(Number(limite))
        
    ])


    res.json({
        total,
        usuarios
    });
}


    const  usuariosPost =async (req, res= response) => {
       

    const {nombre,correo,password,role} = req.body;
    const usuario = new Usuario( {nombre,correo,password,role} );
        //encriptar la contraseña
        const salt= bcryptjs.genSaltSync();
        usuario.password= bcryptjs.hashSync(password,salt);
        //guardar en db
    await usuario.save();

    res.json({
       
        message: 'Hello world-api controlador',
        usuario
    });
}

const usuariosPut =async (req, res= response) => {
    const {id} = req.params;
    const {__id,password,google,correo,...resto} = req.body;

    if (password) {
        const salt= bcryptjs.genSaltSync();
        resto.password= bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);



         res.json(usuario );
   

}

   

const usuariosDelete =async (req, res= response) => {
    const {id}= req.params;

    const uid= req.uid;

    const usuario = await Usuario.findByIdAndUpdate(id,{ estado: false});

    const usuarioAutenticado = req.usuario;



    res.json({usuario, usuarioAutenticado});
}


module.exports = {
    usuariosGet,usuariosPost,usuariosPut,usuariosDelete
}