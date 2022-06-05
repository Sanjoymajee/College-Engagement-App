const express = require('express');
const router = express.Router();
const {
    getProfile
} = require('../controllers/profileController');
const isAuth = require('../middleware/isAuth');

router.get('/profile', isAuth, getProfile);

module.exports = router;