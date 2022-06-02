const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controllers/authController');

router.get('/login',authController.login);
router.post('/login',authController.postLogin);
router.get('/signup',authController.signup);
router.post('/signup',authController.postSignup);
router.get('/logout',authController.logout);

module.exports = router;