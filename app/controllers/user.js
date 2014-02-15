'use strict';

/**
 * Module dependencies.
 */
var response = require('../models/response').response;
var mongoose = require('mongoose');
 
var User = mongoose.model('user', UserSchema);
 
/**
 * List of Users
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