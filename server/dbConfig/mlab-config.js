var mongoose = require('mongoose');
var connectionString = 'mongodb://pluser:reddevils18@ds018568.mlab.com:18568/pl-fantasy';
var connection = mongoose.connection;

mongoose.connect(connectionString);
connection.on('error', err =>{
    console.log('server error:', err);
});
connection.once('open', ()=>{
    console.log('Connected to Database');
});