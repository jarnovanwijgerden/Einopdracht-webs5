var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Data Access Layer
var mongoose = require('./dataAccess/database')();
// /Data Access Layer



var app = express();
var api = require('./API/api');



var UserSchema = require('./models/user')(mongoose);
var RaceSchema = require('./models/race')(mongoose);
var WaypointSchema = require('./models/Waypoint')(mongoose);





var userSchema = mongoose.model("User");




var passport = require('./config/passport')(userSchema);
var routes = require('./routes/index');

var users = require('./routes/users')(passport, mongoose);
var races = require('./routes/races')(mongoose);
var waypoints = require('./routes/waypoints')(mongoose);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);
app.use('/races', races);
app.use('/waypoints', waypoints);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
