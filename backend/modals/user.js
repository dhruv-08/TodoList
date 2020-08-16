var mongoose=require("mongoose");
var plm=require('passport-local-mongoose');
var schema=mongoose.Schema;
var User=new schema({
    
});
User.plugin(plm);
module.exports=mongoose.model('User',User);