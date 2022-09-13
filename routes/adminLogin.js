const express = require('express');
const router = express.Router();
const getLogin = require('../controller/adminLogin')


router.post('/admin-login', getLogin.postLogin)
router.post('/admin-register', getLogin.register)


module.exports = router;