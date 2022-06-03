const Post = require('../models/post');

exports.getInputForm = (req, res) => {
    res.render('create');
}
exports.createPost = async (req, res) => {
    const { content, title, type } = req.body;
    const hashTags = content.split(' ').filter(str => str.startsWith('#'));
    try {
        const post = await Post.create({
            title,
            type,
            content,
            author: req.session.user.username,
            date: new Date(),
            upvote: 0,
            hashTags
        })
        const blogs = await Post.find({});
        res.render('blog', { blogs });
    } catch (err) {
        console.log(err);
    }
}

