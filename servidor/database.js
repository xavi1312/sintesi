const mongoose = require('mongoose');
const URI      = 'mongodb://localhost/projectefinal';

mongoose.connect(URI)
    .then(db => console.log('Connectats a la BD'))
    .catch(err => console.error(err));

module.exports = mongoose;