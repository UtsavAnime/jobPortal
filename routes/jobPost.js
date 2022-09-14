const express = require("express");
const router = express.Router();
const getjobPost = require("../controller/jobPost");

router.post("/admin-jobPost", getjobPost.postPost);
router.get("/admin-getJobPost", getjobPost.getPost);
router.delete("/admin-deleteJobPost", getjobPost.deletePost);

module.exports = router;
