const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');

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

userSchema.methods.generateJWT = () => {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    var jwt = jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
      }, "PROJECTE_FINAL");
    return jwt;
};

userSchema.plugin(uniqueValidator);
mongoose.model('User', userSchema);