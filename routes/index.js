var changeCase = require('change-case');
var express = require('express');
var routes = require('require-dir')();
var config = require('nconf');

module.exports = function(app) {
  'use strict';

  // Initialize all routes
  Object.keys(routes).forEach(function(routeName) {
    var router = express.Router();
    // You can add some middleware here
    // router.use(someMiddleware);

    // Initialize the route to add its functionality to router
    require('./' + routeName)(router);

    // Add router to the speficied route name in the app
    if(routeName == 'home'){
      app.use('/', router);
    }
    else if(routeName == 'api'){
       app.use('/' + changeCase.paramCase(routeName), router);
    }
    else {
      app.use('/api/' + changeCase.paramCase(routeName), router);
    }
  });
};
