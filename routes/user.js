
const {Router} = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validacion');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete }=require('../controller/usuarios');

const { esRolValido ,
        emailValido,
        existeUsuarioId}=require('../helpers/db-validatos');


const router = Router();

router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    check('rol').custom( esRolValido ), 
    validarCampos
],usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailValido ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ), 
    validarCampos
], usuariosPost );

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
],usuariosDelete );






module.exports = router;