const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalJobs = await Job.countDocuments();

    const totalApplications =
      await Application.countDocuments();

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

    const hired =
      await Application.countDocuments({
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

module.exports = {
  getAnalytics,
};