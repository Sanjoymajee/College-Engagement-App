const express = require('express');
const router = express.Router();
const {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    getLogout,
    getUsername,
    getEmail
} = require('../controllers/authController');
const isAuth = require('../middleware/isAuth');
const isNotAuth = require('../middleware/isNotAuth');

router.get('/login', isNotAuth, getLogin);
router.post('/login', isNotAuth, postLogin);
router.get('/signup', isNotAuth, getSignup);
router.post('/signup', isNotAuth, postSignup);
router.get('/logout', isAuth, getLogout);
router.get('/signup/username/', isNotAuth, getUsername);
router.get('/signup/email/', isNotAuth, getEmail);

module.exports = router;