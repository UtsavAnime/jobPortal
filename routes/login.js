const express = require('express');
const router = express.Router();
const Login = require('../controller/login')


router.post('/login', Login.postLogin)
router.post('/logout', Login.getLogout)

module.exports = router;