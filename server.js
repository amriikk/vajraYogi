var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');


// load the env vars
require('dotenv').config();

// connect to the MongoDB with mongoose
require('./config/database');

// load and configure passport.js
require('./config/passport');

// create the express app
var app = express();

var indexRouter = require('./routes/index');
var yogisRouter = require('./routes/yogis');
var asanasRouter = require('./routes/asanas');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "VajraWarrior!",
  resave: false, //to suppress deprecation warnings
  saveUninitialized: true //to suppress deprecation warnings
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/yogis', yogisRouter);
app.use('/asanas', asanasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
