const path = require('path');
const express = require('express');
const router = express.Router();
const getLogin = require('../controller/login')

router.get('/login', (req, res) => {
    res.render(path.join(__dirname, '../', 'views', 'login.pug'));
});

router.post('/submit-login', getLogin.getLogin);

module.exports = router;