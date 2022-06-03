const Post = require('../models/post');

exports.getProfile = async (req,res) => {
    const {username} = req.session.user;
    const posts = await Post.find({author: username});
    res.render('profile',{posts});
}