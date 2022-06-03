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
    const fullName = req.body.fullName,
        email = req.body.email,
        password = req.body.password;
    let username = email.split("@")[0];
    let hashPassword = await bcrypt.hash(password, 12);
    console.log(hashPassword);
    try {
        const user = await User.create({
            email,
            password: hashPassword,
            username,
            name: fullName,
            posts: [],
            admin: true
        })
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}
exports.getLogout = (req, res) => {
    req.session.isLoggedIn = false;
    res.redirect('/');
}