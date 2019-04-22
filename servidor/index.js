const express = require('express');
const app     = express();
const morgan  = require('morgan');
const path    = require('path');
var passport = require('passport');
var cors = require('cors');
var cookieParser = require('cookie-parser');

const { mongoose } = require('./database');
require('./config/passaport');

// Static field (angular compiled)

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : `${err.name}: ${err.message}`});
    }
  });

// Routes
app.use('/api/auth', require('./routes/auth.routes'));

// Strarting the server
app.listen(app.get('port'), () => {
    console.log(`\n Server excoltant per el port ${app.get('port')}`);
});