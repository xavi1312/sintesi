const express = require('express');
const app     = express();
const morgan  = require('morgan');
const config = require('./config/config');

// Settings
app.set('port', config.port);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/usuari.routes'));
app.use('/api/tags', require('./routes/etiquetes.routes'));

module.exports = app;