const express = require("express");
const { getAllJobs, postJob, getMyJobs, updateJob, deleteJob, getSingleJob } = require("../controllers/jobController");
const isAuthenticated = require("../middlewares/auth.js");

const router= express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthenticated, postJob);
router.get("/getmyjobs", isAuthenticated, getMyJobs);
router.put("/update/:id", isAuthenticated, updateJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);
router.get("/:id", isAuthenticated, getSingleJob);

module.exports = router;