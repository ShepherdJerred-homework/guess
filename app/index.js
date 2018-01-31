const bodyParser = require('body-parser');
const express = require('express');
const expressSession = require('express-session');
const morgan = require('morgan');

const config = require('../config');

const guessRouter = require('guess/routes');

const app = express();

app.use(morgan('dev'));
app.use(expressSession({
  secret: config.sessionSecret,
  saveUninitialized: false,
  resave: false
}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', guessRouter);

app.listen(config.serverPort, () => console.log('Listening on port ' + config.serverPort + '...'));
