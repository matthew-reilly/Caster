'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

var User = mongoose.model('user', UserSchema);

/**
 * List of Users
 */
exports.all = function(req, res) {
    User.find().exec(function(err, user) {
        if (err) {
            res.render(err);
        } else {
            res.jsonp(user);
        }
    });
};