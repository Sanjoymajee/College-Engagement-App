const Post = require('../models/post');

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Post.find({
            type: 'Blog'
        });
        res.render('blog', {
            blogs
        });
    } catch (err) {
        console.log(err);
    }
}
exports.getAllNotices = async (req, res) => {
    const notices = await Post.find({
        type: 'Notice'
    });
    res.render('notice', {
        notices
    });
}

exports.getInterviews = async (req, res) => {
    const interviews = await Post.find({
        type: 'Interview'
    });
    res.render('blog', {
        blogs: interviews
    });
}

exports.getBlog = async (req, res) => {
    const blogId = req.params.id;
    try {
        const singlePost = await Post.findById({
            _id: blogId
        });
        let userId = "";
        let liked = "active";
        let notLiked = "";
        let msg = "";
        if (req.session.user) {
            userId = req.session.user._id._id.toString();
            msg = "notLiked";
            singlePost.upVotedList.map(id => {
                if (userId == id) {
                    liked = "";
                    notLiked = "active";
                    msg = "liked";
                }
            })
        }
        res.render('singlePost', {
            singlePost,
            liked,
            notLiked,
            msg
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getUpvotePost = async (req, res) => {
    const blogId = req.params.id;
    const isUpVote = req.params.isUpVote;
    let userId = '';
    if (req.session.user) {
        userId = req.session.user._id._id.toString();
    }
    try {
        const post = await Post.findById(blogId);
        let alreadyUpVoted = false;
        if (isUpVote == 1) {
            post.upVotedList.map(async id => {
                if (userId == id) {
                    alreadyUpVoted = true;
                }
            })
            let updatedUpVotedList = post.upVotedList.filter(id => userId !== id);
            if (alreadyUpVoted);
            else updatedUpVotedList.push(userId);
            post.upVotedList = updatedUpVotedList;
            const updatedPost = await post.save();
            let data = await JSON.stringify({
                upvote: updatedPost.upVotedList.length
            });
            res.send(data);
        }
    } catch (err) {
        console.group(err);
    }
}