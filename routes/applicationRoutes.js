const express = require("express");
const router = express.Router();
const admin = require("../middleware/adminMiddleware");

const { protect } = require("../middleware/authMiddleware");
const {
  applyForJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
} = require("../controllers/applicationController");

// Apply for a job
router.post("/:jobId", protect, applyForJob);
router.get("/my", protect, getMyApplications);
router.get("/my", protect, getApplicationsForJob);
router.put("/:id/status", protect, admin, updateApplicationStatus);

module.exports = router;