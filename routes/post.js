const express = require('express');
const router = express.Router();
const { getAllBlogs, getBlog, getAllNotices } = require('../controllers/postController');

router.get('/blog', getAllBlogs);
router.get('/blog/:id', getBlog);
router.get('/notice', getAllNotices);

module.exports = router;
