const {Router} = require('express');
const { check } = require('express-validator');
const { renew, login } = require('../controllers/auth');
const { loginExisteEmail } = require('../helpers');

const { validarCampos, 
        validarJWT } = require('../middlewares')

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(loginExisteEmail),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login)

router.get('/renew', [
    validarJWT,
    validarCampos
], renew)

module.exports = router;