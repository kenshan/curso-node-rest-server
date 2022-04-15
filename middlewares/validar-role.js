const {response}=require('express');


const esAdminRole= (req,res = response,next)=>{
    if( !req.usuario){
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere ver el usuario sin validar el token'
        });
    }

    const {role,nombre}=req.usuario

    if(role !== 'ADMIN_ROLE'){
        return res.status(500).json({
            ok: false,
            msg: `El usuario ${nombre} no es administrador`
        });
    }
    next();
}

const tieneRole=(...roles)=>{
    
    return (req,res,next)=>{
        console.log(roles)
        if( !req.usuario){
            return res.status(500).json({
                ok: false,
                msg: 'Se quiere ver el usuario sin validar el token'
            });
        }

        

        if (!roles.includes(req.usuario.role)){
            return res.status(500).json({
                ok: false,
                msg: `El usuario no tiene el rol ${roles}`
            });
        }
            
            }
            next();
        }
        

module.exports={
    esAdminRole,
    tieneRole
}