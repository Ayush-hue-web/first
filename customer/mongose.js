
//const mongodb=require('mongodb');
//const validator=require('validator');
const mongoose=require('mongoose');
const frnds=mongoose.Schema({nm:{type:String},
                             nick:{type:String}
                            });

const SignSchema=mongoose.Schema({naam:{type:String,required:true},
                                                email:{type:String,required:true},
                                                password:{type:String,required:true},
                                                nickname:{type:String,required:true},
                                                friends:{type:[frnds]},
                                                requests:{type:[frnds],}
                                            });
module.exports=mongoose.model('Signup',SignSchema);

































// const Signup=mongoose.model('Signup',{naam:{type:String,required:true},
//                                             email:{type:String,validate(value){
//                                                 if(!validator.isEmail(value))
//                                                    {
//                                                        throw new Error('INVALID EMAIL ID PLEASE ENTER VALID EMAIL');
//                                                    }
//                                             },required:true},
//                                             password:{type:String,required:true},
//                                             nickname:{type:String,required:true}
//   