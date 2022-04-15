const moment = require('moment');
const Evento = require('../models/Evento');
const Usuario = require('../models/usuario');

const registerExisteEmail = async (email = '') => {
    // esta funcion es la que se encarga de verificar si el email existe para cuando se esta creando un usuario nuevo.
    
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
        throw new Error(`El email ${email} ya esta registrado.`)
    }
}

const idValido = async (id = '') => {
    // Esta funcion sirve para verificar si ese usuario existe ya sea para consultar un usuario en la base de datos, eliminarlo o actualizarlo.

    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error('El usuario no existe')
    }
}

const loginExisteEmail = async (email = '') => {
    // para cuando se este haciendo el login esta funcion verifica si el email exite o no

    const existeEmail = await Usuario.findOne({ email });

    if (!existeEmail) {
        throw new Error(`El email ${email} no existe.`)
    }
}

// validaciones del evento
const isDate = (value, {req, location, path}) => {
    // esta funcion verifica la fecha del evento la fecha de creacion
    if(!value){
        return false;
    }

    const fecha = moment(value);
    if(fecha.isValid()){
        return true;
    }else {
        return false;
    }
}

const isEvent = async(id = '') => {
    // esta funcion verifica que estemos actualizando un evento existente
    const existeEvento = await Evento.findById(id);
    if(!existeEvento){ 
        throw new Error('El evento que intenta editar no existe.')
    }
}

module.exports = {
    registerExisteEmail,
    loginExisteEmail,
    idValido,
    isDate,
    isEvent
}