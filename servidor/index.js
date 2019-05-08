const express = require('express');
const app     = express();
const morgan  = require('morgan');
const path    = require('path');
var cors = require('cors');

const { mongoose } = require('./database');

// Static field (angular compiled)

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : `${err.name}: ${err.message}`});
    }
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tags', require('./routes/tags.routes'));

// Strarting the server
app.listen(app.get('port'), () => {
    console.log(`\n Server excoltant per el port ${app.get('port')}`);
});