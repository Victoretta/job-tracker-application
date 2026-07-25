const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {
  getAnalytics,
} = require("../controllers/adminController");

router.get(
  "/analytics",
  protect,
  admin,
  getAnalytics
);

module.exports = router;