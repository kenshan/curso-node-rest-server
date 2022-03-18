const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validacion');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete }=require('../controller/usuarios');
const {esRolValido , emailValido,existeUsuarioId}=require('../helpers/db-validatos');


const router = Router();

router.get('/', usuariosGet );
router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('role').custom(esRolValido),
    validarCampos
], usuariosPut );
router.post('/', [ check('correo').custom(emailValido),
check('nombre','el nombre debe ser obligatorio').not().isEmpty(),
check('password',"la contraseña debe tener mas de 6 caracteres").isLength({min:6}),
// check('role','el rol debe ser obligatorio').isIn(['ADMIN_ROLE' ,'USER_ROLE']),
check('role').custom(esRolValido),
validarCampos
] , usuariosPost );
router.delete('/:id',[
    check('id').custom(existeUsuarioId),
    check('role').custom(esRolValido),
    validarCampos
], usuariosDelete);
                                




module.exports= router;