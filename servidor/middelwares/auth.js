const service = require('../services/services');

function jwtControlErrors(err, req, res, next) {
    // Si el toquen descoduficat a donat error retorna l'error al client
    if(err.name === 'UnauthorizedError') return res.status(err.status).send({message: `Token no valid: ${err.message}`});
    next();
}
module.exports = jwtControlErrors;