const mongoose = require('mongoose');
const config = require('./config/config');

mongoose.connect(config.db, {useNewUrlParser: true})
    .then(db => console.log('Connectats a la BD'))
    .catch(err => console.error(err));

module.exports = mongoose;