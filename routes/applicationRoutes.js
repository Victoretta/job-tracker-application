const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  applyForJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
  getApplicantDashboard,
  getAllApplications,
} = require("../controllers/applicationController");

router.get(
  "/dashboard",
  protect,
  getApplicantDashboard
);




// Logged-in user views their applications
router.get("/my", protect, getMyApplications);

// Admin: Get all applications
router.get(
  "/",
  protect,
  admin,
  getAllApplications
);

// Admin views all applications for a job
router.get("/job/:jobId", protect, admin, getApplicationsForJob);

// User applies for a job
router.post("/:jobId", protect, applyForJob);

// Admin updates application status
router.put("/:id/status", protect, admin, updateApplicationStatus);




module.exports = router;