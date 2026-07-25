const Job = require("../models/Job");

// Create Job
// Create Job
const createJob = async (req, res) => {
  try {
    const {
      company,
      position,
      description,
      skills,
      experience,
      salary,
      location,
      employmentType,
      openings,
      applicationDeadline,
      status,
    } = req.body;

    // Default logo path
    let companyLogo = "";

    // If an image was uploaded
    if (req.file) {
      companyLogo = `/uploads/companies/${req.file.filename}`;
    }

    const job = await Job.create({
      company,
      companyLogo,
      position,
      description,
      skills,
      experience,
      salary,
      location,
      employmentType,
      openings,
      applicationDeadline,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all jobs created by the logged-in admin
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get a single job
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const {
      company,
      position,
      description,
      skills,
      experience,
      salary,
      location,
      employmentType,
      openings,
      applicationDeadline,
      status,
      isActive,
    } = req.body;

    const updateData = {
      company,
      position,
      description,
      skills,
      experience,
      salary,
      location,
      employmentType,
      openings,
      applicationDeadline,
      status,
      isActive,
    };

    // Update logo only if a new one is uploaded
    if (req.file) {
      updateData.companyLogo = `/uploads/companies/${req.file.filename}`;
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Ensure the logged-in admin owns this job
    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Public: Get all available jobs
const getPublicJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const Application = require("../models/Application");

// // Admin Dashboard Statistics
// const getDashboardStats = async (req, res) => {
//   try {
//     const totalJobs = await Job.countDocuments({
//       createdBy: req.user._id,
//     });

//     const availableJobs = await Job.countDocuments({
//       createdBy: req.user._id,
//       status: "Available",
//     });

//     const closedJobs = await Job.countDocuments({
//       createdBy: req.user._id,
//       status: "Closed",
//     });

//     // Find this admin's jobs
//     const jobs = await Job.find({
//       createdBy: req.user._id,
//     }).select("_id");

//     const jobIds = jobs.map(job => job._id);

//     const totalApplications = await Application.countDocuments({
//       job: { $in: jobIds },
//     });

//     res.json({
//       totalJobs,
//       availableJobs,
//       closedJobs,
//       totalApplications,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// Admin Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const Application = require("../models/Application");

    const jobs = await Job.find({
      createdBy: req.user._id,
    });

    const jobIds = jobs.map(job => job._id);

    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const availableJobs = jobs.filter(
      job => job.status === "Available"
    ).length;

    const closedJobs = jobs.filter(
      job => job.status === "Closed"
    ).length;

    const comingSoonJobs = jobs.filter(
      job => job.status === "Coming Soon"
    ).length;

    const hiredCandidates = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Hired",
    });

    res.json({
      totalJobs: jobs.length,
      availableJobs,
      closedJobs,
      comingSoonJobs,
      totalApplications,
      hiredCandidates,
      
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
const getAnalytics = async (req, res) => {
  try {
    const jobs = await Job.find();

    // Count jobs by status
    const availableJobs = jobs.filter(
      (job) => job.status === "Available"
    ).length;

    const comingSoonJobs = jobs.filter(
      (job) => job.status === "Coming Soon"
    ).length;

    const closedJobs = jobs.filter(
      (job) => job.status === "Closed"
    ).length;

    // Monthly jobs created
    const monthlyJobs = Array(12).fill(0);

    jobs.forEach((job) => {
      const month = new Date(job.createdAt).getMonth();
      monthlyJobs[month]++;
    });

    res.json({
      monthlyJobs,
      availableJobs,
      comingSoonJobs,
      closedJobs,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getPublicJobs,
  getDashboardStats,
  getAnalytics,
};