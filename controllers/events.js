const { response } = require('express');
const Evento = require('../models/Evento')
const mongoose = require('mongoose');

const getEventos = async(req, res = response) => {
    
    const eventos = await Evento.find().populate('user', 'name')
    
    return res.status(201).json({
        ok: true, 
        eventos
    })
}

const crearEvento = async(req, res = response) => {
    //Para grabarlo en la base de datos

    const evento = new Evento(req.body)

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarEvento = async(req, res = response) => {
    //obtener id por url
    const eventoId =  req.params.id;
    //uid del usuario
    const uid = req.uid;
    try {
        // buscar en BD el id del evento
        const evento = await Evento.findById(eventoId);
        if(!evento) {
           return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id'
            })
        };
  
        // Verificar que la misma persona que creo el evento es la persona que lo quiere verificar
        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permitido editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true}); 
        
        res.json({
            ok: true, 
            eventoActualizado
        })

    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarEvento = async(req, res) => {
    //obteniendo el id del evento
    const eventoId = req.params.id;
    const uid = req.uid;
    try {       
        const evento = await Evento.findById(eventoId);
        
        if(!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        };

        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false, 
                msg: 'No tiene permitido eliminar este evento'
            })
        };      

        await Evento.findByIdAndDelete(eventoId) 

        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error); 
        res.status(501).json({
            ok: false, 
            msg: 'Hable con el administrador'
        })
    }
    
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}