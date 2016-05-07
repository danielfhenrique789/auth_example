var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('client-sessions');

//MongoDb
mongoose.connect('mongodb://localhost/add_people',function(err){
    if(err){
      console.log("Erro ao conectar com MongoDb. Erro: "+err);
    }
});

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//sessions
app.use(session({
  cookieName: 'session',
  secret: 'kjlçkjsisjuskhahgskjd',
  duration: 30*60*1000,
  activeDuration: 5*60*1000,
}));

//hide the password
app.use(function(request,response, next)
{
  console.log("deleta senha");
  if(request.session && request.session.user)
  {
    console.log("existe sessao");
    var User = require('./models/AddPeople/people');
    User.findOne({"user.username": request.session.user.user.username},function(err,people)
    {

    console.log("existe usuario");
      if(err){
        console.log("Erro ao encontrar usuario. App.js Erro: "+err);
      }
      else
        if(people){
          console.log("achou usuario. app.js");
          delete people.user.password;
          //request.people.user = people.user;
          request.session.user = people;
        }
      next();
    });
  }
  else
    next();
});

app.use(function(request,response,next){
  request.rules = function(controller,action,rules,callback){
    var error;
    if(rules === "logged"){
      if(!(request.session && request.session.user))
        error = "É necessário efetuar o login para acessar esta requisição.";

    }
    
    callback(error);
  }
  next();
});

require("./router")(app);



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
