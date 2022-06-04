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
        const singlePost = await Post.findOne({ _id: req.params.id });
        res.render('singlePost', { singlePost });
    }
    catch (err) {
        console.log(err);
    }
}

exports.getUpvotePost = async (req, res) => {
    const blogId = req.params.id;
    const isUpVote = req.params.isUpVote;
    const userId = req.session.user._id._id.toString();
    try {
        const post = await Post.findById({ _id: blogId });
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
            let data = await JSON.stringify({ upvote: updatedPost.upVotedList.length});
            res.send(data);
        }
        // else
        //     post.upvote -= 1;
    }
    catch (err) {
        console.group(err);
    }
}