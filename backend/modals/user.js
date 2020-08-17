var mongoose=require("mongoose");
var plm=require('passport-local-mongoose');
var schema=mongoose.Schema;
var User=new schema({
    list:[{
        text:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        }
    }]
});
User.plugin(plm);
module.exports=mongoose.model('User',User);