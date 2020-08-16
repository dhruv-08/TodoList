var mongoose=require("mongoose");
var plm=require('passport-local-mongoose');
var schema=mongoose.Schema;
var l=new schema({
    text:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})
var User=new schema({
    list:[l]
});
User.plugin(plm);
module.exports=mongoose.model('User',User);