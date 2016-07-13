var express = require('express');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var cors = require('cors');



var routes = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');
var gcmUser = require('./routes/gcmUser');
var app = express();

//database parts starts here
mongoose.connect('mongodb://localhost/ts16DB',function(err){
  if(err) {
    console.log('error occured'+err);
  }
  else {
    console.log('connected');
  }
});
//autoIncrement.initialize(connection);
//console.log('auto increment added to app.js');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//session part comes here
app.use(session({
  secret           : 'sbcdbty589yt985bivfb985986795867598',    //will encrypt the key
  name             : 'TS16',
  resave           :  true,
  saveUninitialized:  true
}));
app.use(cors());
console.log('CORS enabled');
console.log('session secret key created');
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function(req,res,next){
//   console.log('SETTING CORS IN APP.JS');
//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
//   console.log('CORS HAS BEEN ENABLED');
//   next();
// });

app.use('/', routes);
app.use('/users', users);
app.use('/events',events);
app.use('/gcmUser',gcmUser);

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
