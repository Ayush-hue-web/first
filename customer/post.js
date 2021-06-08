const mongoose=require('mongoose');

const posts=mongoose.Schema({id:{type:Number,required:true},
    nickname:{type:String,required:true},
    date:{type:String,required:true},
    message:{type:String},
    like:{type:[String],required:true,default:[]},
    dislike:{type:Number,required:true,default:0},
   });

module.exports=mongoose.model('Posts',posts);