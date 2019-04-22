const express = require('express');
const app     = express();
const morgan  = require('morgan');
const path    = require('path');
var passport = require('passport');

const { mongoose } = require('./database');
require('./config/passport');

// Static field (angular compiled)

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));

// Strarting the server
app.listen(app.get('port'), () => {
    console.log(`\n Server excoltant per el port ${app.get('port')}`);
});