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
    if(err) {
      console.log(err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});
router.post('/login', (req, res) => {
  User.findOne({username:req.body.username})
  .then((user)=>{
      if(user){
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
  User.find({username:req.session.passport.user})
  .then((user)=>{
    if(user){
      User.update({username:req.session.passport.user},{
        $push:{"list":{
          text:req.body.t,
          date:req.body.dat
        }},
      }, function(err, affected, resp) {
        console.log("Ohh");
     });
    }
  });
});
router.post('/delup',(req,res,next)=>{
  User.find({username:req.session.passport.user})
  .then((user)=>{
    if(user){
      User.update({username:req.session.passport.user},{
        list:req.body.arr
      }, function(err, affected, resp) {
        console.log("Ohh");
     });
    }
  });
});
router.get("/total",(req,res,next)=>{
  User.findOne({username:req.session.passport.user})
  .then((user)=>{
    if(user){
      var tot=user.total+1;
      User.update({username:req.session.passport.user},{
        total:tot,
      }, function(err, affected, resp) {
        console.log("Ohh");
     });
    }
  })
})
router.post('/edit',(req,res,next)=>{
  User.findOne({username:req.session.passport.user})
  .then((user)=>{
    if(user){
      var list=user.list[req.body.index]._id;
      User.update({username:req.session.passport.user,"list._id":list},{
        $set: { "list.$.text" : req.body.edit }
      }, function(err, affected, resp) {
        console.log("Ohh");
     });
    }
  })
})
router.get("/data",(req,res,next)=>{
  User.find({username:req.session.passport.user})
  .then((user)=>{
      res.send(user);
  });
})
router.post("/count",(req,res,next)=>{
  User.findOne({username:req.session.passport.user})
  .then((user)=>{
    if(user){
      var val=user.count+1;
      var tot=user.total+1;
      User.update({username:req.session.passport.user},{
        count:val,
        total:tot,
      }, function(err, affected, resp) {
        console.log("Ohh");
     });
    }
  })
});
router.post("/beforecount",(req,res,next)=>{
  User.findOne({username:req.session.passport.user})
  .then((user)=>{
    if(user){
      var val=user.beforecount+1;
      var tot=user.total+1;
      User.update({username:req.session.passport.user},{
        beforecount:val,
        total:tot
      }, function(err, affected, resp) {
        console.log("Ohh");
     });
    }
  })
})
router.post("/aftercount",(req,res,next)=>{
  User.findOne({username:req.session.passport.user})
  .then((user)=>{
    if(user){
      var val=user.aftercount+1;
      var tot=user.total+1;
      User.update({username:req.session.passport.user},{
        aftercount:val,
        total:tot
      }, function(err, affected, resp) {
        console.log("Ohh");
     });
    }
  })
})
router.get('/todolist',(req,res,next)=>{
  User.find({username:req.session.passport.user})
  .then((usr)=>{
      console.log(usr);
      res.send(usr);
  });
})
router.get('/logout',async(req,res,next)=>{
  await req.logout();
  req.session.destroy();
  res.clearCookie("session_id",{path:"/",httpOnly:true});
});
module.exports = router;
