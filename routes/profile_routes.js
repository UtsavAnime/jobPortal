const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/profile', (req, res) => {
    res.render(path.join(__dirname, '../', 'views', 'profile.pug'));
});



module.exports = router;