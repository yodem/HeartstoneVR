'use strict';

const cors = require('cors');
const express = require('express');
const fs = require('fs');
const models = join(__dirname, 'models');
const port = process.env.PORT || 8000;
const app = express();

module.exports = app;

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

// Bootstrap routes
require('./config/express')(app);
require('./config/routes')(app);

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
};

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.db, options).connection;
};