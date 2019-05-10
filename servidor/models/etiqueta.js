const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const etiquetaSchema = Schema ({
    nom: {
        type: String,
        required: true,
        unique: true
    },
    tasques: [{
        type: Schema.Types.ObjectId, ref: 'Tasca'
    }]
});
tagSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Etiqueta', etiquetaSchema);