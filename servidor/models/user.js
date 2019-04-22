const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    userTohomework: [{
        type: Schema.Types.ObjectId, ref: 'Homework'
    }],
    hash: String,
    salt: String
});
userSchema.plugin(uniqueValidator);

mongoose.model('User', userSchema);