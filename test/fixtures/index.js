var app = require('express')();
var routeLoader = require('../../');

routeLoader(app, __dirname + '/routes');

module.exports = app;