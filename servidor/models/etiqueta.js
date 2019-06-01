const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const etiquetaSchema = Schema ({
    nom: {
        type: String,
        required: true
    },
    usuari: {
        type: String,
        required: true,
    },
    tasques: [{
        type: Schema.Types.ObjectId, ref: 'Tasca'
    }]
});
etiquetaSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Etiqueta', etiquetaSchema);