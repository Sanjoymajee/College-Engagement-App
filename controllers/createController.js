const Post = require('../models/post');

exports.getInputForm = (req,res)=>{
    res.render('create.ejs');
}
exports.createPost = async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            type: req.body.type,
            content: req.body.content,
            author: "Sanjoy",
            date: new Date(),
            upvote: 0
        })
        res.redirect('/blog');
    } catch(err){
        console.log(err);
    }
}

