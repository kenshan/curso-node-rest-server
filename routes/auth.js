const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validacion');


const router = Router();

router.post('/login',[
    check('correo','el correo es obligatorio').isEmail(),
    check('password', ' la clave es obligatoria').not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('id_token', ' el id_token es necesario').not().isEmpty(),
    validarCampos
],googleSingIn);


module.exports = router;