const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  uploadProfileImage,
  uploadResume,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

// Get current logged-in user
router.get("/me", protect, getMe);
// update profile 
router.put(
  "/profile",
  protect,
  updateProfile
);
// upload profile pics
router.post(
  "/upload-profile-image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);
router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  uploadResume
);


module.exports = router;