const { Router } = require('express');
const { check } = require('express-validator');

// controllers
const { getEventos, 
        postEvento, 
        putEvento, 
        deleteEvento } = require('../controllers/events');

// middlewares
const { validarCampos, 
        validarJWT } = require('../middlewares')

// helpers
const { isDate,
        isEvent } = require('../helpers')

// inicializamos el router
const router = Router();

// obtener eventos
router.get('/',  [
    validarJWT,
    validarCampos
], getEventos)

// crear eventos
router.post('/', [
    validarJWT,
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
], postEvento);

// actualizar evento
router.put('/:id', [
    validarJWT,
    check('id', 'El id del evento no es valido').isMongoId(),
    check('id').custom(isEvent),
    validarCampos
], putEvento);

// eliminar evento
router.delete('/:id', [
    validarJWT,
    check('id', 'El id del evento no es valido').isMongoId(),
    check('id').custom(isEvent),
    validarCampos
], deleteEvento);


module.exports = router;