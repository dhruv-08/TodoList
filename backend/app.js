var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("mongoose");
var session=require("express-session");
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser=require("body-parser");
var app = express();
var passport=require('passport');
var MongoStore=require('connect-mongodb-session')(session);
var authenticate = require('./authenticate');
app.use(bodyParser.json());
const dbOptions={
  useNewUrlParser:true,
  useUnifiedTopology:true,
}
var connect=mongoose.connect("mongodb://localhost:27017/new");
connect.then((db)=>{
  console.log("Connected Successfully!");
})
const sessionMongo=new MongoStore({
  uri:"mongodb://localhost:27017/new",
  collection:"session"
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  name:"session_id",
  secret:process.env.SECRET,
  saveUninitialized:true,
  resave:false,
  store:sessionMongo,
  cookie:{
    maxAge:new Date(Date.now() + (1000*60*60*24))
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);

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
