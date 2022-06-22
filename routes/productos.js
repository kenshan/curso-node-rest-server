const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controller/auth');
const { crearProducto, obtenerProductos , obtenerProducto, borrarProducto, actualizarProducto } = require('../controller/Productos');
const { existeProducto } = require('../helpers/db-validatos');
const { validarJwt,validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoria } = require('../helpers/db-validatos');


const router = Router();

/**
 * {{url}}api/Productos
 */

// obtener todas las Productos - publico
router.get ('/',obtenerProductos);

// obtener una Producto por id- publico
router.get ('/:id', [
    check('id',"no es un id de mongo valido").isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
]
,obtenerProducto);

// Crear Producto privado -cualquiera con token valido
router.post('/', [
    validarJwt,
    check('nombre','El nombre es necesario').not().isEmpty(),
    check('categoria','La categoria es necesaria').isMongoId(), //es un id de mongo
    check('categoria').custom( existeCategoria),
    validarCampos
], crearProducto);

// actualizar Producto privado -cualquiera con token valido    
router.put ('/:id',[
    validarJwt,
    check('nombre',"el nombre es obligatorio").not().isEmpty(),
    check('id').custom(existeProducto),
    validarCampos
],actualizarProducto);

// obtener una Producto por id- publico
router.delete ('/:id',[
    validarJwt,
    esAdminRole,
check('id', 'No es un ID válido').isMongoId(),
check('id').custom( existeProducto ),
validarCampos],borrarProducto);


module.exports = router;