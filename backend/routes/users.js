var express = require('express');
var router = express.Router();
var bodyParser=require("body-parser");
var User=require('../modals/user');
var passport=require('passport');
/* GET users listing. */
router.use(bodyParser.json());
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
var passport=require('passport');
router.post('/signup',(req,res,next)=>{
  User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
    if(err){
      res.statusCode=500;
      res.setHeader("Content-Type",'application/json');
      res.json({err:err});
    }
    else{
      passport.authenticate('local')(req,res,()=>{
        res.statusCode=200;
        res.setHeader("Content-Type",'application/json');
        res.json({success:"true"});
      });
    }
  });
});
router.post('/login',passport.authenticate('local'),(req,res,next)=>{
        res.statusCode=200;
        res.setHeader("Content-Type",'application/json');
        res.json({success:"true"});
});
router.get('/logout',(req,res,next)=>{
  req.session.destroy();
  res.clearCookie('session_id');
  res.redirect('/');
});
module.exports = router;
