const moongoose=require('mongoose');
const userSchema=new moongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    leetcode_id:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    questionsolved:{
      type:[{}],
    }
})

const User=moongoose.model('users',userSchema);
module.exports=User;