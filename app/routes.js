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

    // api routes ===========================================================
    // authentication routes

    app.get('/api/cards', cards.all);

    app.get('/api/users', users.all);
    // sample api route
    app.get('/api/groups', groups.all);

    app.post('/api/group/create', groups.create);

    // route to handle creating (app.post)
    // route to handle delete (app.delete)

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