const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const { company, position, status } = req.body;

    const job = await Job.create({
      company,
      position,
      status,
      createdBy: req.user.id,
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

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id });

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

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Make sure the job belongs to the logged-in user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }


    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
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


//delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check ownership
    if (job.user.toString() !== req.user.id) {
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

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
};