const { response } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/users");

const validarJwt= async(req, res= response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    
    try {
       const {uid}= jwt.verify(token, process.env.SECRET_KEY);

        

        const usuario = await Usuario.findById(uid);

        req.usuario= usuario;

        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
            
        if (!usuario.estado) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario estado false'
            });
        }
        
       
        req.usuario= usuario;
        next();
    }
     catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }


     console.log(token);

  
    }

    
    



module.exports={
    validarJwt
}