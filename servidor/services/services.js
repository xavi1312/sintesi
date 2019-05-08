const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config')

const services = {}

services.createToken = (user) => {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN);
}

services.decodeToken = (token) => {
    const descodificat = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);

            if(payload.exp <= moment.unix()) {
                reject({
                    status: 401,
                    message: 'El token a caducat'
                })
            }

            resolve(payload.sub);
        } catch (err) {
            reject({
                status: 500,
                message: 'Token invalid'
            })
        }
    })

    return descodificat;
}

module.exports = services;