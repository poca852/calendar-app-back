const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    };

    try {
        const { uid } = jwt.verify(token, process.env.JSONWEBTOKEN);

        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'No existe este usuario'
            });
        };

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario desactivado'
            });
        };

        req.name = usuario.name;
        req.uid = usuario.id
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    };
    next();
};

module.exports = validarJWT