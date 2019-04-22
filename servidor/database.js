const mongoose = require('mongoose');
const URI      = 'mongodb://localhost:27017/projectefinal';

mongoose.connect(URI, {useNewUrlParser: true})
    .then(db => console.log('Connectats a la BD'))
    .catch(err => console.error(err));

module.exports = mongoose;