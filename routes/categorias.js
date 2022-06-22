const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controller/auth');
const { crearCategoria, obtenerCategorias , obtenerCategoria, borrarCategoria, actualizarCategoria } = require('../controller/categorias');
const { existeCategoria } = require('../helpers/db-validatos');
const { validarJwt,validarCampos, esAdminRole } = require('../middlewares');



const router = Router();

/**
 * {{url}}api/categorias
 */

// obtener todas las categorias - publico
router.get ('/',obtenerCategorias);

// obtener una categoria por id- publico
router.get ('/:id', [
    check('id',"no es un id de mongo valido").isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
]
,obtenerCategoria);

// Crear categoria privado -cualquiera con token valido
router.post ('/',[
    validarJwt,
    check('nombre','El nombre es necesario').not().isEmpty()
    ,validarCampos
], crearCategoria);

// actualizar categoria privado -cualquiera con token valido    
router.put ('/:id',[
    validarJwt,
    check('nombre',"el nombre es obligatorio").not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);

// obtener una categoria por id- publico
router.delete ('/:id',[
    validarJwt,
    esAdminRole,
check('id', 'No es un ID válido').isMongoId(),
check('id').custom( existeCategoria ),
validarCampos],borrarCategoria);
module.exports = router;