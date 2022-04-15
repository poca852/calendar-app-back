const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    estado: {
        type: Boolean,
        required: true,
        default: true
    }
})

UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.id = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);