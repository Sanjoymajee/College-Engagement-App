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
exports.getAllNotices = async (req, res) => {
    const posts = await Post.find({ type: 'notice' });
    res.render('notice', { posts });
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