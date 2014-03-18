'use strict';

/**
 * Module dependencies.
 */
var response = require('../models/Response').response;
var mongoose = require('mongoose');
 
var User = mongoose.model('user', UserSchema);
 
/**
 * Create new user
*/
exports.create = function(req, res) {
	var user = new User({
		name: req.body.user_name
	});
	user.save(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.jsonp(user);
		}
	});
};
 
/**
 * List of users
 */
exports.all = function(req, res) {
    User.find().exec(function(err, user) {

        if (err) {
        	response.success=false;
        	response.msg="Could not load users";
            res.render(response);
        } else {
        	response.result = user;
        	response.err_code=0;
        	response.msg ="Yay";
        
            res.jsonp(response);
        }
    });
};