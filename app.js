'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var path = require('path');
var _ = require('underscore');
var app = express();
var resolve = require('./src/common/resolve');

module.exports = app; // for testing

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/api/swagger'));

/*app.get('/swagger', function (req, res) {
  res.send('Hello World!');
});*/
var parsedSwagger;
resolve.resolveYaml()
.then(function (result){
	parsedSwagger = result;
});

app.get('/parsedSwagger', function (req, res) {
  res.send(parsedSwagger);
});

var controllersDirs = [
	"api/controllers",
	"src/features"
]

controllersDirs = _.map(controllersDirs, resolveAppPath);

var config = {
  appRoot: __dirname, // required config
  controllersDirs : controllersDirs
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
});

function resolveAppPath(to) {
    return path.resolve(__dirname, to);
  };
