'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

var Card = mongoose.model('Card', CardSchema);

/**
 * List of Cards
 */
exports.all = function(req, res) {
    Card.find().exec(function(err, cards) {
        if (err) {
            res.render(err);
        } else {
            res.jsonp(cards);
        }
    });
};