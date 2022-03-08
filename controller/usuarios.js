const {response} = require('express');

const usuariosGet = (req, res= response) => {
    
    const {q,nombre="no name",apykey} = req.query;

    res.json({

        q,
        nombre,
        apykey,
       
        message: 'Hello world-api controlador'
    });
}


const usuariosPost = (req, res= response) => {

    const body = req.body;
    

    res.json({
       
        message: 'Hello world-api controlador',
        body
    });
}

const usuariosPut = (req, res= response) => {
    const {id} = req.params;

    res.json({
       
        message: 'Hello world-api controlador',
        id  
    });
}

const usuariosDelete = (req, res= response) => {
    

    res.json({
       
        message: 'Hello world-api controlador'
    });
}


module.exports = {
    usuariosGet,usuariosPost,usuariosPut,usuariosDelete
}