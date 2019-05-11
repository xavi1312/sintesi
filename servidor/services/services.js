const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config')
const bcrypt = require('bcrypt');

const services = {}

services.createToken = (user) => {
    // Creació del payload (sub: idUsauri)
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN);
}

services.encodePassowrd = (password) => {
    // Bcrypt encripta la password amb un salt de 10
    const hash = bcrypt.hash(password, 10).then((res) => {
        return res
    })
    
    return hash;
}

module.exports = services;