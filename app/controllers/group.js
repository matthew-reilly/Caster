'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');



var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId();
 
 
 
var GroupSchema2 = new Schema({
    nick        : {type: String,  trim: true }
  , email       : {type: String,  trim: true, lowercase: true }
});
 

mongoose.model('Group', GroupSchema2);




var Group = mongoose.model('Group');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    Article.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var article = new Group(req.body);
   

    article.save(function(err) {
        if (err) {
             console.log(err);
            return res.send('/', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
             console.log(req.body);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.article);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Group.find().exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};