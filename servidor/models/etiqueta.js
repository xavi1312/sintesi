const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const etiquetaSchema = new Schema ({
    nom: {
        type: String,
        required: true,
        unique: true
    },
    etiquetes: [{
        type: Schema.Types.ObjectId, ref: 'Tasca'
    }]
});
tagSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Etiqueta', etiquetaSchema);