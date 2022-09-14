const express = require("express");
const router = express.Router();
const getRegister = require("../controller/register");

router.post("/register", getRegister.getRegister);

module.exports = router;
