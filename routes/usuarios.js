const { Router } = require('express');
const { check } = require('express-validator');

// controllers
const { postUsuario,
        getUsuario,
        putUsuario,
        deleteUsuario,
        getUsuarios } = require('../controllers/usuarios');

// helpers 
const { registerExisteEmail,
        idValido } = require('../helpers');

// middlewares 
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/', [
        check('name', 'El Nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail().custom(registerExisteEmail),
        check('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
], postUsuario);

router.get('/', getUsuarios);

router.get('/:id', [
        check('id', 'No es un ID valido.').isMongoId(),
        check('id').custom(idValido),
        validarCampos
], getUsuario);

router.put('/:id', [
        check('id', 'No es un ID valido.').isMongoId(),
        check('id').custom(idValido),
        validarCampos
], putUsuario);

router.delete('/:id', [
        check('id', 'No es un ID valido.').isMongoId(),
        check('id').custom(idValido),
        validarCampos
], deleteUsuario);

module.exports = router;