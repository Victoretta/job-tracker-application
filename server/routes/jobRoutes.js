const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getPublicJobs,
  getDashboardStats,
  getAnalytics,
} = require("../controllers/jobController");
const upload = require("../middleware/companyUpload");


// Public jobs
router.get("/public", getPublicJobs);

// job stats
router.get(
  "/stats/dashboard",
  protect,
  admin,
  getDashboardStats
);

// Create job
router.post(
  "/",
  protect,
  admin,
  upload.single("companyLogo"),
  createJob
);


// Logged-in user's/admin's jobs
router.get("/", protect, getJobs);

router.get(
  "/analytics",
  protect,
  admin,
  getAnalytics
);

// Single job
router.get("/:id", protect, getJobById);

// Update job
router.put(
  "/:id",
  protect,
  admin,
  upload.single("companyLogo"),
  updateJob
);

// Delete job
router.delete("/:id", protect, admin, deleteJob);



module.exports = router;