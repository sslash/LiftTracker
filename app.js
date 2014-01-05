var express = require('express'),
  mongoose = require('mongoose'),
  mongoConfig = require('./config/mongoConfig'),
  fs = require('fs'),
  passport = require('passport'),
  config = require('./config/config');


mongoConfig.connectToMongo();

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

require('./config/passport')(passport, config);

var app = express();

require('./config/express')(app, config, passport);
require('./config/routes')(app, passport);

app.use(function(req, res, next){
  console.log('%s %s. Body: %s', req.method, req.url, JSON.stringify(req.body));
  next();
});

var port = process.env.PORT || 9000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

module.exports=app;
