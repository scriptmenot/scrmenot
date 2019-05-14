var createError = require('http-errors');
var cors = require('cors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passportPreparation = require('./server/config/passport/passport');
const passport = require('passport');

var router = require('./server/routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
passportPreparation(passport);

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router(passport));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send({ message: 'Something wrong has happened' + err.message});
});

module.exports = app;
