 const { Schema, model } = require('mongoose');
 


 const usuarioSchema= Schema({
     nombre:{
         type:String,
         //se destructura para en el segundo parametro agregar algo para la negacion
         required:[true,'El nombre es necesario']
     },
     correo:{
            type:String,
            required: [true,'El correo es necesario'],
            unique: true
     }
     ,
     password:{
            type:String,
            required: [true,'la contraseña es necesaria'],
            
     }
     ,
     img:{
            type:String,
            
     },
     role:{
         type:String,
         required: [true,'El rol es necesario'],
         emun:['ADMIN_ROLE','USER_ROLE','VENTAS_ROLE']
     },
     estado:{
        type:Boolean,
        default:true

     },
     google:{
        type:Boolean,
        default:false

     }
 });

usuarioSchema.methods.toJSON=function(){
    const {password,__v,_id, ...usuario } = this.toObject();
    usuario.uid= _id;
    return usuario;
}


 module.exports= model('Usuario',usuarioSchema);	