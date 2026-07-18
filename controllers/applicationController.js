const Application = require("../models/Application");
const Job = require("../models/Job");

// Apply for a job
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if the job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check if the user has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    // Create the application
    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resume: req.user.resume,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get all applications of the logged-in user
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate("job", "company position status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: applications.length,
      applications,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Admin: Get all applicants for a specific job
const getApplicationsForJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("applicant", "name email resume")
      .populate("job", "company position");

    res.status(200).json({
      count: applications.length,
      applications,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Admin: Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
    //checking the the status
const allowedStatuses = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Rejected",
  "Hired",
];

if (!allowedStatuses.includes(status)) {
  return res.status(400).json({
    message: "Invalid application status",
  });
}

application.status = status;

await application.save();

await application.populate("applicant", "name email");
await application.populate("job", "company position");

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
};