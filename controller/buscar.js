const {response}    = require('express');
const {ObjectId} = require('mongoose').Types;
const { Usuario, Categoria,Producto }=require('../models/');
const { findById } = require('../models/categoria');



const coleccionesPermitidas = [
    'usuarios',
    'productos',
    'categorias',
    'roles'
];


const buscarUsuarios= async (termino='',res= response)=>{

    const isMongoid = ObjectId.isValid(termino);

    if(isMongoid){
      const usuario = await Usuario.findById(termino);

        res.json({
       results: (usuario) ?[ usuario] : []
    } )
    }

    const regex = new RegExp(termino,'i');
    const usuarios = await Usuario.find( {
       $or :[{nombre: regex },{correo:regex}],
       $and : [{estado:true}]
       } );


    res.json({
        results:usuarios
    });

}

const buscarCategoria= async (termino='',res= response)=>{

    const isMongoid = ObjectId.isValid(termino);

    if(isMongoid){
      const categoria = await Categoria.findById(termino);

        res.json({
       results: (categoria) ?[ categoria] : []
    } )
    }

    const regex = new RegExp(termino,'i');
    const categoria = await Categoria.find( {nombre: regex ,estado:true}  );


    res.json({
        results:categoria
    });

}

const buscarProducto = async (termino='', res=response)=>{

    const isMongoid = ObjectId.isValid(termino);

    if(isMongoid){
       const producto = await Producto.findById(termino).populate('categoria','nombre');
       res.json({
        results: (producto) ? [producto] : []
    })
        }

        const regex = new RegExp(termino,'i');
        const producto = await Producto.find( 
           {nombre: regex ,estado:true} 
            ).populate('categoria','nombre');
    
    
        res.json({
            results:producto
        });

}

const buscar = (req, res) => {

    const { coleccion,termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            ok: false,
            msg: `La colección no existe o no está permitida: las permitidas son ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
       case 'usuarios':
        buscarUsuarios(termino,res);

        break;

       case 'productos':
        buscarProducto(termino,res);
        break;
        

       case 'categorias':
        buscarCategoria(termino,res);
        break;

        
        default:
         res.status(500).json({
                ok: false,
                msg: 'Error en el servidor se le olvido crear esta busqueda'
         }) 


    res.json({
        coleccion,termino
    });
}
}
module.exports = {
    buscar
}