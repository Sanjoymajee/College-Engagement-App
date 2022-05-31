const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/blog',postController.getAllBlogs);
router.get('/notice',postController.getAllNotices);

module.exports = router;
