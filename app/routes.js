// app/routes.js

var groups = require('./controllers/group');
var cards = require('./controllers/card');
var users = require('./controllers/user');
/**
 * Module dependencies.
 */
    var mongoose = require('mongoose');




    var Group = mongoose.model('Group');


	module.exports = function(app) {

		// server routes ===========================================================
		// handle things like api calls
		// authentication routes

		app.get('/api/cards', cards.all);

		app.get('/api/users', users.all);
		// sample api route
		app.get('/api/groups', groups.all);
	 
	    app.post('/api/group/create', groups.create);

		// route to handle creating (app.post)
		// route to handle delete (app.delete)

		// frontend routes =========================================================
		// route to handle all angular requests
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html'); // load our public/views/index.html file
		});

	};