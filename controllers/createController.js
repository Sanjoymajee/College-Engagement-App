const Post = require('../models/post');

exports.getInputForm = (req, res) => {
    res.render('create');
}
exports.createPost = async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            type: req.body.type,
            content: req.body.content,
            author: req.session.user.username,
            date: new Date(),
            upvote: 0
        })
        const blogs = await Post.find({});
        res.render('blog', { blogs });
    } catch (err) {
        console.log(err);
    }
}

