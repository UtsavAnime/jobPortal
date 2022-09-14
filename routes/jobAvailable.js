const express = require("express");
const router = express.Router();
const getJob = require("../controller/jobAvailable");

router.get("/get-jobPost", getJob.getJob);
router.post("/apply-jobPost", getJob.postPost);

module.exports = router;
