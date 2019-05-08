const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const usuariSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    contrasenya: {
        type: String,
        required: true,
        select: false
    },
    tasques: [{
        type: Schema.Types.ObjectId, ref: 'Tasca'
    }],
});

usuariSchema.methods.setPassword = (password) => {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return err

        bcrypt.hash(password, salt, (err, hash) => {
            if(err) return err

            this.contrasenya = hash;
        })
    })
};
/*
userSchema.methods.validPassword = (password) => {
    console.log(password)
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = () => {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    var token = jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
      }, "PROJECTE_FINAL");
    return token;
};
*/
usuariSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Usuari', usuariSchema);