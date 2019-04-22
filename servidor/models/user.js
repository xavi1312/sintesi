const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');

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

userSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
userSchema.methods.validPassword = (password) => {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.plugin(uniqueValidator);
mongoose.model('User', userSchema);