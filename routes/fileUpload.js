const express = require("express");
const fileUpload = require('express-fileupload')
const router = express.Router();

router.use(fileUpload());

router.post("/upload", (req, res, next) => {
    const file = req.files.pdf;
    file.mv('./upload/' + file.name, (err, result) => {
        if(err)
            throw err;
        res.send({
            success: true,
            message: "File uploaded!"
        });
    });
});

module.exports = router;
