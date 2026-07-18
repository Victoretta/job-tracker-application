const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// Only admins can create jobs
router.post("/", protect, admin, createJob);

// Everyone logged in can view jobs
router.get("/", protect, getJobs);

// Only admins can update jobs
router.put("/:id", protect, admin, updateJob);

// Only admins can delete jobs
router.delete("/:id", protect, admin, deleteJob);

module.exports = router;