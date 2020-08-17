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
    }],
        beforecount:{
            type:Number,
            default:0
        },
        count:{
            type:Number,
            default:0
        },
        aftercount:{
            type:Number,
            default:0
        }
});
User.plugin(plm);
module.exports=mongoose.model('User',User);