const express = require("express");
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser");
const registerRoutes = require("./routes/register");
const postRoutes = require('./routes/post');
const createRoutes = require('./routes/create');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/home');
})

app.get('/home', (req, res) => {
    res.render('home.ejs');
})

app.use(registerRoutes);
app.use(postRoutes);
app.use(createRoutes);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('connected to dB');
    })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Listening in 3000'));