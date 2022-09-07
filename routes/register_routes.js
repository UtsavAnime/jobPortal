const path = require('path');
const express = require('express');
const router = express.Router();
const getRegister = require('../controller/register')

router.get('/register', (req, res) => {
    res.render(path.join(__dirname, '../', 'views', 'register.pug'));
});


router.post('/submit-register', getRegister.getRegister);

module.exports = router;
