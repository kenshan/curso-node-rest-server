const validarCampos = require('../middlewares/validacion');
const  validarJwt  = require('../middlewares/validar-jwt');
const  tieneRole  = require('../middlewares/validar-role');



module.exports = {
    ...validarCampos, 
    ...validarJwt,
    ...tieneRole
}