const express = require('express');
const router = express.Router();
const {
    getAllBlogs,
    getBlog,
    getAllNotices,
    getUpvotePost,
    getInterviews,
    deletePost
} = require('../controllers/postController');
const isAuth = require('../middleware/isAuth');
const Post = require('../models/post');

router.get('/blog', getAllBlogs);
router.get('/notice', getAllNotices);
router.get('/interview', getInterviews);
router.get('/blog/vote/:id/:isUpVote', isAuth, getUpvotePost);
router.get('/blog/:id', getBlog);
router.post('/delete/:id', deletePost);

module.exports = router;