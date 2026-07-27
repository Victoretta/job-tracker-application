const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    companyLogo: {
      type: String,
      default: "",
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: String,
      default: "Fresher",
      trim: true,
    },

    salary: {
      min: {
        type: Number,
        default: 0,
      },

      max: {
        type: Number,
        default: 0,
      },

      currency: {
        type: String,
        default: "INR",
      },

      period: {
        type: String,
        enum: ["Hour", "Month", "Year"],
        default: "Year",
      },
    },

    location: {
      type: String,
      default: "Remote",
      trim: true,
    },

    employmentType: {
      type: String,
      enum: [
        "Full-Time",
        "Part-Time",
        "Internship",
        "Contract",
        "Remote",
      ],
      default: "Full-Time",
    },

    openings: {
      type: Number,
      default: 1,
      min: 1,
    },

    applicationDeadline: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Coming Soon",
        "Closed",
      ],
      default: "Available",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);