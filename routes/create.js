const express = require('express');
const router = express.Router();
const createController = require('../controllers/createController');


router.get('/create-post', createController.getInputForm);

router.post('/create-post', createController.createPost);

module.exports = router;
