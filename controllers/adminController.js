const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");



// Analytics

const getAnalytics = async (req, res) => {
  try {
    // Totals
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications =
      await Application.countDocuments();

    // Job status counts
    const availableJobs = await Job.countDocuments({
      status: "Available",
    });

    const comingSoonJobs = await Job.countDocuments({
      status: "Coming Soon",
    });

    const closedJobs = await Job.countDocuments({
      status: "Closed",
    });

    // Application status counts
    const applied = await Application.countDocuments({
      status: "Applied",
    });

    const underReview =
      await Application.countDocuments({
        status: "Under Review",
      });

    const shortlisted =
      await Application.countDocuments({
        status: "Shortlisted",
      });

    const interview =
      await Application.countDocuments({
        status: "Interview",
      });

    const hired = await Application.countDocuments({
      status: "Hired",
    });

    const rejected =
      await Application.countDocuments({
        status: "Rejected",
      });

    res.status(200).json({
      totalUsers,
      totalJobs,
      totalApplications,

      availableJobs,
      comingSoonJobs,
      closedJobs,

      applied,
      underReview,
      shortlisted,
      interview,
      hired,
      rejected,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// Get All Users

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -passwordResetToken -passwordResetExpires")
      .sort({ createdAt: -1 });

    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// Get Single User

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password -passwordResetToken -passwordResetExpires");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// Update User Role

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = role;

    await user.save();

    res.status(200).json({
      message: "Role updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// Activate / Suspend User
const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isActive = isActive;

    await user.save();

    res.status(200).json({
      message: "User status updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// Delete User

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getAnalytics,
  getUsers,
  getUser,
  updateUserRole,
  updateUserStatus,
  deleteUser,
};