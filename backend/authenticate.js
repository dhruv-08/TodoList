var passport = require('passport');
var passportLocal=require('passport-local').Strategy;
var User=require('./modals/user');
exports.local=passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());