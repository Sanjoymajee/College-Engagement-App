const express = require('express');
const router = express.Router();
const { getLogin, postLogin, getSignup, postSignup, getLogout } = require('../controllers/authController');
const isAuth = require('../middleware/isAuth');
const isNotAuth = require('../middleware/isNotAuth');

router.get('/login', isNotAuth, getLogin);
router.post('/login', isNotAuth, postLogin);
router.get('/signup', isNotAuth, getSignup);
router.post('/signup', isNotAuth, postSignup);
router.get('/logout', isAuth, getLogout);

module.exports = router;