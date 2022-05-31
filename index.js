const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const registerRoutes = require("./routes/register");
const postRoutes = require('./routes/post');
const createRoutes = require('./routes/create');
const path = require('path');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.redirect('/home');
})

app.get('/home',(req,res)=>{
    res.render('home.ejs');
})

app.use(registerRoutes);
app.use(postRoutes);
app.use(createRoutes);

app.listen(process.env.PORT || 3000 );

mongoose.connect('mongodb://localhost:27017/collegeApp',()=>{
    console.log('connected to dB');
})