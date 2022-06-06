const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getLogin = async (req, res) => {
    const message = await req.consumeFlash('message');
    res.render('register/login', { message });
}
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const hashPassword = user.password;
            const result = await bcrypt.compare(password, hashPassword);
            if (result) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                res.redirect('/');
            }
            else {
                await req.flash('message', 'Invalid Email or Password');
                res.redirect('/login');
            }
        }
        else {
            await req.flash('message', 'Invalid Email or Password');
            res.redirect('/login');
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.getSignup = (req, res) => {
    res.render('register/signup');
}
exports.postSignup = async (req, res) => {
    const username = req.body.username,
        email = req.body.email,
        password = req.body.password;
    let hashPassword = await bcrypt.hash(password, 12);
    try {
        const user = await User.create({
            email,
            password: hashPassword,
            username,
            posts: [],
            admin: false
        })
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}
exports.getLogout = async (req, res) => {
    await req.session.destroy();
    res.redirect('/');
}

exports.getUsername = async (req, res) => {
    const username = req.query.username;
    const user = await User.findOne({ username });
    if (user) {
        let msg = {
            userExists: true,
            length: username.length,
        }
        let data = JSON.stringify(msg);
        res.send(data);
    }
    else {
        let msg = {
            userExists: false,
            length: username.length
        }
        let data = JSON.stringify(msg);
        res.send(data);
    }
}

exports.getEmail = async (req, res) => {
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (user) {
        let msg = {
            userExists: true
        }
        let data = JSON.stringify(msg);
        res.send(data);
    }
    else {
        let msg = {
            userExists: false
        }
        let data = JSON.stringify(msg);
        res.send(data);
    }
}