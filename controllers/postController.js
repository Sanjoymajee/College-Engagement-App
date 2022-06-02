const Post = require('../models/post');

exports.getAllBlogs = async (req,res)=>{
    try{
        const blogs = await Post.find({});
        req.session.blogs = "blogs";
        const isLoggedIn = req.session.isLoggedIn;
        res.render('blog.ejs',{blogs,isLoggedIn});
    }
    catch(err) {
        console.log(err);
    }
}
exports.getAllNotices = (req,res)=>{
    const isLoggedIn = req.session.isLoggedIn;
    res.render('notice.ejs',{isLoggedIn});
}