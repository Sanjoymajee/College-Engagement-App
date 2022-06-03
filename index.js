const express = require("express");
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const postRoutes = require('./routes/post');
const createRoutes = require('./routes/create');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = process.env.DATABASE;
const store = new MongoDBStore({ uri: MONGODB_URI, collection: 'sessions' });
const {flash} = require('express-flash-message');
const csrf = require('csurf');

let csrfProtection = csrf();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(session({ secret: "My secret", resave: false, saveUninitialized: false, store: store }));
app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use(csrfProtection);

app.use((req,res,next)=>{
    res.locals.isLoggedIn = req.session.isLoggedIn;
    if(req.session.user)
        res.locals.username = req.session.user.username;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.get('/', (req, res) => {
    res.redirect('/home');
})

app.get('/home', (req, res) => {
    res.render('home.ejs');
})

app.use(authRoutes);
app.use(postRoutes);
app.use(createRoutes);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('connected to dB');
    })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening in ${PORT}`));