const service = require('../services/services');

function isAuth (req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send({ message: 'No tens autorització' });
    }

    const token = req.header.authorization.split(' ')[1];
    service.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status).send(response.message);
        })
}

module.exports = isAuth;