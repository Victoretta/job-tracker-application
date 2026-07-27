const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getAnalytics,
  getUsers,
  getUser,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} = require("../controllers/adminController");

// Analytics
router.get(
  "/analytics",
  protect,
  admin,
  getAnalytics
);



// User Management


// Get all users
router.get(
  "/users",
  protect,
  admin,
  getUsers
);

// Get single user
router.get(
  "/users/:id",
  protect,
  admin,
  getUser
);

// Update user role
router.put(
  "/users/:id/role",
  protect,
  admin,
  updateUserRole
);

// Activate / Suspend user
router.put(
  "/users/:id/status",
  protect,
  admin,
  updateUserStatus
);

// Delete user
router.delete(
  "/users/:id",
  protect,
  admin,
  deleteUser
);

module.exports = router;