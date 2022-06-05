const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/users");
const { GoogleAuth } = require("google-auth-library");
const { googleVerify } = require("../helpers/google-verify");



const login = async(req, res = response) => {
     
    const {correo,password} =req.body;

    try {

        //verificar si el mail existe
        const usuario =await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario o la contraseña no son correctos'
            });
        }

        //usuario activo 
        if(!usuario.estado){
            return res.status(400).json({
                msg:'El usuario no esta activo'
            });
        }
        //verificar contraseña 
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'La contraseña no son correctos'
            });
        }
        //generar jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,token
        }) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:' Hable con el administrador del sistema'
        })
    }


    
   

}  

const googleSingIn = async(req, res = response) => {
    const {id_token} = req.body;

    try {
       const {correo , nombre , img} = await googleVerify(id_token);
       let usuario = await Usuario.findOne({correo});
         //verificar si el usuario existe

        if(!usuario){
            const data={
            nombre,
            img,
            correo,
            password: ':p ',
            google: true,
        role:'USER_ROLE'}
            usuario= new Usuario(data);
            await usuario.save();
        }

        //si usuario existe

        if(!usuario.estado){
            return res.status(400).json({
                msg:'El usuario no esta activo'
        });
    }
       
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        });
    }
    catch (error){
        console.warn(error);
        res.status(400).json({
            ok:false,
            msg:'El id_token no es valido'
        })
    }

    
    
}
module.exports = {
    login, googleSingIn
}