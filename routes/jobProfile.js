const express = require('express');
const router = express.Router();
const postProfile = require('../controller/jobProfile')
const getProfile = require('../controller/jobProfile')

router.post('/edit-profile', postProfile.postProfile);
router.get('/profile', getProfile.getProfile);

module.exports = router;