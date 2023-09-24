// const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();



require('./db/conn');


app.use(express.json());


app.use(require('./Api/authApi'));




// Middelware 
const middleware = (req,res, next) => {
    console.log(`Hello my Middleware`);
    next();
}


app.get('/about', middleware, (req, res) => {
    console.log(`Hello my About`);
    res.send(`Hello About world from the server`);
});

app.get('/contact', (req, res) => {
    res.send(`Hello Contact world from the server`);
});

app.get('/signin', (req, res) => {
    res.send(`Hello Login world from the server`);
});

app.get('/signup', (req, res) => {
    res.send(`Hello Registration world from the server`);
});

app.listen(3001, () => {
    console.log(`server is runnig at port no 3001`);
})

