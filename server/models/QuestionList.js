const moongoose=require('mongoose');
const QstList=new moongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
    },
    tags:{
        type:String,
        required:true,
    },
   
    
})

const Questionlist=moongoose.model('ques',QstList);
module.exports=Questionlist;