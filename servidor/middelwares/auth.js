const service = require('../services/services');

function jwtControlErrors(err, req, res, next) {
    if(err.name === 'UnauthorizedError') res.status(err.status).send({message:err.message});
    next();
}
module.exports = jwtControlErrors;