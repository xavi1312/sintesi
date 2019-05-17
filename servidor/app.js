const express = require('express');
const app     = express();
const morgan  = require('morgan');
const config = require('./config/config');
const cors = require('cors');

// Settings
app.set('port', config.port);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/usuari.routes'));
app.use('/api/etiquetes', require('./routes/etiquetes.routes'));
app.use('/api/tasques', require('./routes/tasques.routes'));

module.exports = app;