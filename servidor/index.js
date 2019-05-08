const { mongoose } = require('./database');
const app = require('./app');

// Static field (angular compiled)

// Strarting the server
app.listen(app.get('port'), () => {
    console.log(`\n Server escoltant per el port ${app.get('port')}`);
});