const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tascaSchema = Schema ({
    nom: {
        type: String,
        required: true
    },
    contingut: {
        type: String
    },
    acabada: {
        type: Boolean,
        default: false
    },
    dataCreacio: {
        type: Date,
        default: Date.now
    },
    alarma: {
        type: Date
    },
    usuari: {
        type: Schema.Types.ObjectId, ref: 'Usuari'
    },
    etiquetes: [{
        type: Schema.Types.ObjectId, ref: 'Etiqueta'
    }]
});

module.exports = mongoose.model('Tasca', tascaSchema);