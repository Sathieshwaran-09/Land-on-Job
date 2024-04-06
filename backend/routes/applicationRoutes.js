const express = require("express")
const isAuthenticated = require("../middlewares/auth.js");
const { recruiterGetAllApplications, jobseekerGetAllApplications, jobseekerDeleteApplication, postApplication } = require("../controllers/applicationController.js");

const router= express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/employer/getall", isAuthenticated, recruiterGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);

module.exports = router;