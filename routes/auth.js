const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validacion');


const router = Router();

router.post('/login',[
    check('correo','el correo es obligatorio').isEmail(),
    check('password', ' la clave es obligatoria').not().isEmpty(),
    validarCampos
],login);


module.exports = router;