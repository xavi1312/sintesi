const express = require('express');
const app     = express();
const morgan  = require('morgan');
const path    = require('path');

const { mongoose } = require('./database');

// Static field (angular compiled)

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes

// Strarting the server
app.listen(app.get('port'), () => {
    console.log(`\n Server excoltant per el port ${app.get('port')}`);
});