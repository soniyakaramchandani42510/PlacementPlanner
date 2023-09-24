const express=require('express')
const app=express();
const mongoose=require('mongoose')
const DB='mongodb+srv://admin:admin@cluster0.fypb02e.mongodb.net/placement_planner?retryWrites=true&w=majority'
mongoose.connect(DB,{
    useNewUrlParser: true,     // Use new URL parser
    useUnifiedTopology: true,
}).then(()=>{
    console.log('data base bhi setup ho gya');
}).catch((err)=>console.log('error in db setup'));