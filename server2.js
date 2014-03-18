// server2.js

var express = require('express');
var app = express();

//syntax guidance
//http://nodejs.org/api/modules.html
var expressInitializer = require('./init/express.js');
console.log('expressInitializer<'+expressInitializer.version+'> loaded');

var staticDirectory = __dirname + '/app2/public';//css and images
expressInitializer.configure(app, express, staticDirectory);