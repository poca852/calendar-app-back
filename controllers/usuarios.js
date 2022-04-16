const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const { generarJWT } = require("../helpers");
const Usuario = require('../models/usuario');

const postUsuario = async (req = request, res = response) => {
    
    const { name, password, email } = req.body;

    try {

        // virificamos si el usuario ya existe en la base de datos
        const existeUsuario = await Usuario.findOne({email});
        if(existeUsuario){ 
            return res.status(404).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }

        // si llega a este punto es porque no existe ningun usuario
        const usuario = new Usuario({ name, password, email });

        // encriptamos el password
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();

        // generamos el token
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            name: usuario.name,
            id: usuario.id,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    };

};

const getUsuarios = async (req = request, res = response) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({
            usuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    };
};

const getUsuario = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        res.status(200).json({
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    };
};

const putUsuario = async(req = request, res = response) => {
    try {

        const {id} = req.params;

        const { estado, 
                _id, 
                password, 
                email,
                ...user } = req.body;

        if(password){
            user.password = bcryptjs.hashSync(password, 10);
        };

        const usuario = await Usuario.findByIdAndUpdate(
            id, 
            user, 
            {new: true}
        );

        res.status(201).json({
            ok: true,
            usuario 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    };
};

const deleteUsuario = async(req = request, res = response) => { 
    try {
        // extraer el id que nos mandan por parametros para despues buscar ese usuario
        const { id } = req.params;

        // una vez obtenemos el usuario procedemos a actualizar el estado a false
        const usuario = await Usuario.findByIdAndUpdate(
            id, 
            {estado: false}, 
            {new: true}
        );

        // resp 
        res.status(201).json({
            ok: true,
            name: usuario.name,
            uid: usuario._id,
            estado: usuario.estado
        });        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    };
};

module.exports = {
    postUsuario,
    getUsuarios,
    getUsuario,
    putUsuario,
    deleteUsuario,
};