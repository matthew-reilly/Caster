// app/routes.js

/**
 * Include controllers
 */
var rooms = require('./controllers/room');
var cards = require('./controllers/card');
var users = require('./controllers/user');

var groups = require('./controllers/group');

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

module.exports = function(app) {

    // api routes ===========================================================
	// create new user
	app.post('/api/users/create', users.create);
	// return all users
	app.get('/api/users', users.all);	
	
	// return room object by objectid
	app.get('/api/room/:room_id', rooms.findone);

    app.get('/api/room/:room_id/players', rooms.findPlayers);

    app.post('/api/room/:room_id/addCard', rooms.addCard);
	// create new room
	app.post('/api/room/create', rooms.create);
	// add player to room
	app.post('/api/room/:room_id/editCard', rooms.editCard);
	// return all rooms
	app.get('/api/room', rooms.all);	

	app.post('/api/room/addplayer', rooms.addplayer);
	
	// deal cards to players
	app.post('/api/room/dealcards', rooms.dealCards);
	
	// return all cards
	app.get('/api/cards', cards.all);
	
	//Group calls
	app.get('/api/groups', groups.all);
	app.post('/api/group/create', groups.create);

    // frontend routes =========================================================
    app.get('/io/tv', function(req, res) {
        res.sendfile('./public/io/tv.html'); // load our public/views/index.html file
    });
    app.get('/io/phone', function(req, res) {
        res.sendfile('./public/io/phone.html'); // load our public/views/index.html file
    });
    
    app.get('/', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/views/index.html file
    });

    app.get('/views/:name', function(req, res) {
        var name = req.params.name;
        res.render('views/' + name);
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/views/index.html file
    });

};