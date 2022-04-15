const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },

    notes: {
        type: String,
    },

    start: {
        type: Date,
        require: true
    },

    end: {
        type: Date,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

EventoSchema.methods.toJSON = function() {
    const {__v, _id, ...event} = this.toObject();
    event.id = _id;
    return event
}

module.exports = model('Evento', EventoSchema)