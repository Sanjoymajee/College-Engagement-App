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
    const blogId = req.params.id;
    try {
        const singlePost = await Post.findById({ _id: blogId });
        let userId = "";
        let liked = "active";
        let notLiked = "";
        if (req.session.user) {
            userId = req.session.user._id._id.toString();
            singlePost.upVotedList.map(id => {
                if (userId == id) {
                    liked = "";
                    notLiked = "active";
                }
            })
        }
        res.render('singlePost', { singlePost, liked, notLiked });
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
            let data = await JSON.stringify({ upvote: updatedPost.upVotedList.length, alreadyUpVoted: alreadyUpVoted });
            res.send(data);
        }
        // else
        //     post.upvote -= 1;
    }
    catch (err) {
        console.group(err);
    }
}