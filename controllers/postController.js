const Post = require('../models/post');

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Post.find({});
        res.render('blog', { blogs });
    }
    catch (err) {
        console.log(err);
    }
}
exports.getAllNotices = (req, res) => {
    res.render('notice');
}

exports.getBlog = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        res.render('post', { post });
    }
    catch (err) {
        console.log(err);
    }
}