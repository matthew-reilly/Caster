// app/routes.js


var models = ['./controllers/group', './controllers/card', './controllers/user'];

exports.initialize = function() {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i]);
    }
};