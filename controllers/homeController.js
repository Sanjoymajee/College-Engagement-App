const Post = require('../models/post');

exports.getHome = async (req, res) => {
    const blogs = await Post.find({type: 'Blog'});
    const interviews = await Post.find({type: 'Interview'});
    const notices = await Post.find({type: 'Notice'});
    res.render('home',{blogs,interviews,notices});
}

