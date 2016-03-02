// server.js
var express = require('express');
var path = require('path');
var fs = require('fs');
var https = require('https');
var http = require('http');
// var exphbs  = require('express-handlebars');
// var logger = require('./logging');
// var monitor = require('./monitoring');
var config = require('nconf');

// Local dependecies

// create the express app
// configure middlewares
var bodyParser = require('body-parser');
var morgan = require('morgan');
// var winston = require('winston');
var app;

var start =  function(cb) {
  'use strict';
  // =============================================================================
  // Configure app
  // =============================================================================
  app = express();

  // Configure body parser
  app.use(morgan('common'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({type: '*/*'}));

  console.log('[SERVER] Initializing routes');

  // =============================================================================
  // Models
  // =============================================================================
  // var Response = require('../../app/models/response');

  // =============================================================================
  // ROUTES FOR OUR API
  // =============================================================================
  require('./routes/index')(app);

  // Register the Views Directory
  // app.set('views', path.join(__dirname, '../../app/views/'));
  // Initialize and set the view engine to use Handlebars
  // app.engine('.hbs', exphbs({
  //   defaultLayout: 'main',
  //   layoutsDir: path.join(__dirname, '../../app/views/layouts'),
  //   partialsDir: path.join(__dirname, '../../app/views/partials'),
  //   extname: '.hbs'}
  // ));
  // app.set('view engine', '.hbs');


  //Register Public Directory
  app.use(express.static(path.join(__dirname, './public')));

  // Error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : {err})
    });
    console.log('error', err.message);
    next(err);
  });

  // start http and https
  http.createServer(app).listen(config.get('NODE_PORT'));

  // if(config.get('NODE_HTTPS') == 'true') {
  //   // SSL cert
  //   var privateKey  = fs.readFileSync(config.get('NODE_SSL_KEY'), 'utf8');
  //   var certificate = fs.readFileSync(config.get('NODE_SSL_CERT'), 'utf8');
  //   var credentials = {key: privateKey, cert: certificate};
  //   https.createServer(credentials, app).listen(config.get('NODE_SECURE_PORT'));
  // }


  console.log('[SERVER] listening on port(s) ' + config.get('NODE_PORT'));

  if (cb) {
    return cb();
  }
};

module.exports = start;
