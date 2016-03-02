// /index.js
'use strict';
var server = require('./server.js');
var nconf = require('nconf');
var async = require('async');
// var logger = require('./config/initializers/logging');

// Load Environment variables from .env file
require('dotenv').load();

// Set up configs
nconf
  .use('memory')
  .argv()             // First load command line arguments
  .env();             // Load environment variables

// Load config file for the environment
// require('./config/environments/' + nconf.get('NODE_ENV'));

console.log('[APP] Starting server initialization');

// Initialize Modules
async.series([
  // function initializeDBConnection(callback) {
  //   require('./config/initializers/database')(callback);
  // },
  function startServer(callback) {
    server(callback);
  }], function(err) {
    if (err) {
      console.log('[APP] initialization failed', err);
    } else {
      console.log('[APP] initialized SUCCESSFULLY');
    }
  }
);
