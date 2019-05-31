const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const service = require('../services/services');

const usuariSchema = Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    contrasenya: {
        type: String,
        required: true
    },
    tasques: [{
        type: Schema.Types.ObjectId, ref: 'Tasca'
    }],
});

usuariSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Usuari', usuariSchema);