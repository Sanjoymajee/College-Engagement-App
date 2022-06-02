const User = require('../models/user');

exports.login = (req,res)=>{
    res.render('login');
}
exports.postLogin = async (req,res)=>{
    const email = req.body.email,
    password = req.body.password;
    const user = await User.findOne({email,password});
    if(user){
        req.session.isLoggedIn = true;
        res.redirect('/')
    }
    else{
        res.render('login',{wrongUser : true});
    }
}
exports.signup = (req,res)=>{
    res.render('signup');
}
exports.postSignup = async (req,res)=>{
    const fullName = req.body.fullName,
    email = req.body.email,
    password = req.body.password,
    username = email.split("@")[0];
    try {
        const user = await User.create({
            email,
            password,
            username,
            name: fullName,
            posts: [{}],
            admin: true
        })
        req.session.isLoggedIn = true;
        res.redirect('/');
    } catch(err){
        console.log(err);
    }
}
exports.logout = (req,res)=>{
    req.session.isLoggedIn = false;
    res.redirect('/');
}