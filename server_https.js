// server.js

// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require("fs");

var KEY_FILE = fs.readFileSync("/etc/expresskey/private.key");
var CERT_FILE = fs.readFileSync("/etc/expresskey/ssl.crt");
var INT_CERT_FILE = fs.readFileSync("/etc/expresskey/sub.class1.server.ca.pem");
 
var server = require('https').createServer({key: KEY_FILE,cert: CERT_FILE,ca: INT_CERT_FILE},app),
    io = require('socket.io').listen(server);
// configuration ===========================================
server.listen(443);
// config files
var db = require('./config/db');
var Schema = mongoose.Schema;
var port = process.env.PORT || 443; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)
console.log(mongoose.connection.readyState);


mongoose.connection.on('error', function(err) {
    // Do something
    console.log(err);
});
 


io.sockets.on('connection', function (socket) {
  
	socket.on('room', function(room) {
        socket.join(room);

    });

    socket.on('message', function(room) {
		        
		var room = "abc123";
		io.sockets.in(room).emit('message', 'what is going on, party people?');
        
    });


});


app.configure(function() {
    app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.bodyParser()); // have the ability to pull information from html in POST
    app.use(express.methodOverride()); // have the ability to simulate DELETE and PUT
});

// include models ===========================================
require('./app/models');

// include routes (controllers included)=======================
require('./app/routes')(app);

 
// start app ===============================================
//app.listen(port); // startup our app at http://localhost:8080
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app

