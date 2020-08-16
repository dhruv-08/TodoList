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
router.post('/signup', (req, res, next) => {
  const user=new User({username: req.body.username})
  User.register(user, 
    req.body.password, (err, user) => {
      console.log("hehe");
    if(err) {
      console.log(err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      console.log(user);
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});
var Logname="t";
router.post('/login', (req, res) => {
  User.findOne({username:req.body.username})
  .then((user)=>{
      if(user){
        Logname=req.body.username;
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'You are successfully logged in!'});
        });
      }
      else{
        res.statusCode = 401;
         res.setHeader('Content-Type', 'application/json');
        res.json({success:false});
      }
  })
});
router.post('/todo',(req,res,next)=>{
  User.find({username:Logname})
  .then((user)=>{
    if(user){
      User.update({username:Logname},{
        $push:{"list":{
          text:req.body.t,
          date:req.body.dat
        }}
      }, function(err, affected, resp) {
        console.log("Ohh");
     });
    }
  });
});
router.post('/delup',(req,res,next)=>{
  User.find({username:Logname})
  .then((user)=>{
    if(user){
      User.update({username:Logname},{
        list:req.body.arr
      }, function(err, affected, resp) {
        console.log("Ohh");
     });
    }
  });
})
router.get('/todolist',(req,res,next)=>{
  User.find({username:Logname})
  .then((usr)=>{
      console.log(usr);
      res.send(usr);
  });
})
router.get('/logout',(req,res,next)=>{
  req.session.destroy();
  res.clearCookie('session_id');
});
module.exports = router;
