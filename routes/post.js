const express = require('express');
const router = express.Router();
const { getAllBlogs, getBlog, getAllNotices, getUpvotePost } = require('../controllers/postController');
const isAuth = require('../middleware/isAuth');

router.get('/blog', getAllBlogs);
router.get('/blog/:id', getBlog);
router.get('/blog/vote/:id/:isUpVote', isAuth, getUpvotePost);
router.get('/notice', getAllNotices);

module.exports = router;
