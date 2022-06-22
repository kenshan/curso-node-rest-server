const { Schema,model } = require('mongoose');
const { required } = require('nodemon/lib/config');

const productoSchema = new Schema({
    nombre:{
        type:String,
        required:[true,"el nombre es necesario"],
        unique:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
    },
    estado:{
        type:Boolean,
        default:true,  //si no se pone el default es false
        required:true
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    descripcion:{
        type:String
    },
    disponible:{type:Boolean,default:true},
});

productoSchema.methods.toJSON=function(){
    const {__v,estado, ...data } = this.toObject();
    
    return data;
}



module.exports = model('Producto',productoSchema);