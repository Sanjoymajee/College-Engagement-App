const express = require('express');
const router = express.Router();
const {
    getHome
} = require('../controllers/homeController');

router.get('/', (req, res) => {
    res.redirect('/home');
});
router.get('/home', getHome);

module.exports = router;