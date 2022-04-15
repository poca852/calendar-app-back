const { response, request } = require("express");
const Evento = require('../models/Evento');

const getEventos = async (req = request, res = response) => {
    try {
        const eventos = await Evento.find()
            .populate('user', 'name');
        res.status(200).json({
            ok: true,
            eventos
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

// crear evento
const postEvento = async (req = request, res = response) => {

    try {
        const evento = new Evento(req.body);
        evento.user = req.uid
        const eventoGuardado = await evento.save()

        res.status(200).json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}

// actualizar eventos
const putEvento = async (req = request, res = response) => {
    const { id } = req.params;
    const uid = req.uid;
    try {

        const evento = await Evento.findById(id);

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privelegios para editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Evento.findByIdAndUpdate(
            id,
            nuevoEvento,
            { new: true }
        );

        res.status(200).json({
            ok: true,
            evento: eventUpdated
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

// eliminar un evento
const deleteEvento = async (req = request, res = response) => {
    const id = req.params.id;
    const idUser = req.uid;
    try {
        const evento = await Evento.findById(id);
        if (evento.user.toString() !== idUser) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privelegios para eliminar este evento!'
            })
        }

        await Evento.findByIdAndDelete(id)

        res.status(200).json({ ok: true })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}

module.exports = {
    getEventos,
    postEvento,
    putEvento,
    deleteEvento,
}