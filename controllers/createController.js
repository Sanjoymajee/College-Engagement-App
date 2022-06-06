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
        if(type === 'Notice'){
            res.redirect('/notice');
        }
        if(type === 'Blog'){
            res.redirect('/blog');
        }
        if(type === 'Interview'){
            res.redirect('/interview');
        }
    } catch (err) {
        console.log(err);
    }
}

exports.getAdmin = async (req, res) => {
    let type = req.query.type;
    let user = req.session.user;
    // console.log(type);
    try{
        if(type === 'Notice' || type === 'Interview' || type === 'Blog'){
            let msg = {
                admin : user.admin,
                correct : (type === 'Interview' || type === 'Blog')
            }
            let data = await JSON.stringify(msg);
            res.send(data);
        }
    }
    catch(err) {
        console.log(err);
    }
}

