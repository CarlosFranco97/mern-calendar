const {Schema, model} = require('mongoose'); 
const EventoSchema = Schema({
    title: {
        type: String, 
        required: true
    }, 
    notes: {
        type: String
    },
    start: {//Fecha de inicio
        type: Date, 
        required: true
    },
    end: {//Fecha de finalizacion
        type: Date,
        required: true
    },
    user: {//usuario que creó este registro
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id
    return object
})

module.exports = model('Evento', EventoSchema)