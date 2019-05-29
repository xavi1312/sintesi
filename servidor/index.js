const { mongoose } = require('./database');
const app = require('./app');

// Strarting the server
app.listen(app.get('port'), () => {
    console.log(`\n Server escoltant per el port ${app.get('port')}`);
});