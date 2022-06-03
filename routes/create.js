const express = require('express');
const router = express.Router();
const { getInputForm, createPost } = require('../controllers/createController');
const isAuth = require('../middleware/isAuth');

router.get('/create-post', isAuth, getInputForm);

router.post('/create-post', isAuth, createPost);

module.exports = router;
