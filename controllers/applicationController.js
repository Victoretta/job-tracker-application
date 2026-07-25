const Application = require("../models/Application");
const Job = require("../models/Job");
const { sendEmail } = require("../utils/emailService");

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

    // Check if the job is accepting applications
    if (job.status !== "Available" || !job.isActive) {
      return res.status(400).json({
        message: "This job is not accepting applications.",
      });
    }

    // Prevent duplicate applications
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
      });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resume: req.user.resume || "",
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Check if the logged-in user has already applied
const hasApplied = async (req, res) => {
  try {
    const { jobId } = req.params;

    const application = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    res.status(200).json({
      applied: !!application,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get logged-in user's applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate("job", "company position status companyLogo")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: applications.length,
      applications,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin: Get all applications for one job
const getApplicationsForJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate(
        "applicant",
        "name email phone location resume profileImage"
      )
      .populate(
        "job",
        "company position companyLogo"
      );

    res.status(200).json({
      count: applications.length,
      applications,
    });

  } catch (error) {
    console.error(error);

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

    let statusColor = "#2563eb";

switch (status) {
  case "Applied":
    statusColor = "#2563eb";
    break;

  case "Under Review":
    statusColor = "#f59e0b";
    break;

  case "Shortlisted":
    statusColor = "#0ea5e9";
    break;

  case "Interview":
    statusColor = "#8b5cf6";
    break;

  case "Rejected":
    statusColor = "#ef4444";
    break;

  case "Hired":
    statusColor = "#16a34a";
    break;
}

    await application.populate(
      "applicant",
      "name email phone location profileImage"
    );

    await application.populate(
      "job",
      "company position companyLogo"
    );

   await sendEmail({
  to: application.applicant.email,

  subject: `Application Update - ${application.job.position}`,

  html: `
<!DOCTYPE html>

<html>

<body style="
margin:0;
padding:0;
background:#f4f6f9;
font-family:Arial,sans-serif;
">

<div style="
max-width:700px;
margin:40px auto;
background:white;
border-radius:12px;
overflow:hidden;
box-shadow:0 5px 20px rgba(0,0,0,.08);
">

<div style="
background:#2563eb;
padding:30px;
text-align:center;
color:white;
">

<h1 style="margin:0;">
Job Application Tracker
</h1>

<p style="margin-top:10px;">
Your application has been updated
</p>

</div>

<div style="padding:35px;">

<h2>Hello ${application.applicant.name}, 👋</h2>

<p>
We wanted to let you know that your application status has changed.
</p>

<table style="
width:100%;
border-collapse:collapse;
margin-top:25px;
">

<tr>

<td style="
padding:15px;
font-weight:bold;
border-bottom:1px solid #eee;
">
Company
</td>

<td style="
padding:15px;
border-bottom:1px solid #eee;
">
${application.job.company}
</td>

</tr>

<tr>

<td style="
padding:15px;
font-weight:bold;
border-bottom:1px solid #eee;
">
Position
</td>

<td style="
padding:15px;
border-bottom:1px solid #eee;
">
${application.job.position}
</td>

</tr>

<tr>

<td style="
padding:15px;
font-weight:bold;
">
Current Status
</td>

<td style="padding:15px;">

<span style="
background:${statusColor};
padding:8px 18px;
border-radius:20px;
color:white;
font-weight:bold;
display:inline-block;
">
${status}
</span>

</td>

</tr>

</table>

<p style="
margin-top:35px;
color:#555;
line-height:1.7;
">

Please log in to your account to view more details about your application and stay updated on future changes.

</p>

<div style="text-align:center;margin-top:35px;">

<a
href="${process.env.CLIENT_URL}/my-applications"
style="
background:#2563eb;
padding:14px 28px;
color:white;
text-decoration:none;
border-radius:8px;
font-weight:bold;
display:inline-block;
">

View My Applications

</a>

</div>

</div>

<div style="
background:#1e293b;
padding:25px;
color:white;
text-align:center;
font-size:14px;
">

<strong>Job Application Tracker</strong>

<br><br>

Helping job seekers connect with opportunities.

<br><br>

© ${new Date().getFullYear()} Job Application Tracker

</div>

</div>

</body>

</html>
`,
});

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// Applicant Dashboard Statistics
const getApplicantDashboard = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    });

    const totalApplications = applications.length;

    const applied = applications.filter(
      (app) => app.status === "Applied"
    ).length;

    const underReview = applications.filter(
      (app) => app.status === "Under Review"
    ).length;

    const interviews = applications.filter(
      (app) => app.status === "Interview"
    ).length;

    const hired = applications.filter(
      (app) => app.status === "Hired"
    ).length;

    const rejected = applications.filter(
      (app) => app.status === "Rejected"
    ).length;

    const shortlisted = applications.filter(
      (app) => app.status === "Shortlisted"
    ).length;

    res.json({
      totalApplications,
      applied,
      underReview,
      interviews,
      shortlisted,
      hired,
      rejected,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin: Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate(
        "applicant",
        "name email resume profileImage"
      )
      .populate(
        "job",
        "company position"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      applications,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  applyForJob,
  hasApplied,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
  getApplicantDashboard,
  getAllApplications,
};