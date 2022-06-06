const express = require('express');
const router = express.Router();
const {
    getInputForm,
    createPost,
    getAdmin
} = require('../controllers/createController');
const isAuth = require('../middleware/isAuth');

router.get('/create-post', isAuth, getInputForm);

router.post('/create-post', isAuth, createPost);

router.get('/create-post/type/', isAuth, getAdmin);

module.exports = router;