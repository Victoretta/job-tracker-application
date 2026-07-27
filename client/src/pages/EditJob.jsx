import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./EditJob.css";
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase } from "react-icons/fa";

import {
  getJobById,
  updateJob,
} from "../services/jobService";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    company: "",
    companyLogo: "",
    position: "",
    description: "",
    skills: "",
    experience: "",
    salaryMin: "",
    salaryMax: "",
    location: "",
    employmentType: "Full-Time",
    openings: 1,
    applicationDeadline: "",
    status: "Available",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const job = await getJobById(id);

      setFormData({
        company: job.company || "",
        companyLogo: job.companyLogo || "",
        position: job.position || "",
        description: job.description || "",
        skills: job.skills ? job.skills.join(", ") : "",
        experience: job.experience || "",
        salaryMin: job.salary?.min || "",
        salaryMax: job.salary?.max || "",
        location: job.location || "",
        employmentType: job.employmentType || "Full-Time",
        openings: job.openings || 1,
        applicationDeadline: job.applicationDeadline
          ? job.applicationDeadline.substring(0, 10)
          : "",
        status: job.status || "Available",
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Unable to load job.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jobData = {
        company: formData.company,
        companyLogo: formData.companyLogo,
        position: formData.position,
        description: formData.description,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim()),

        experience: formData.experience,

        salary: {
          min: Number(formData.salaryMin),
          max: Number(formData.salaryMax),
          currency: "INR",
          period: "Year",
        },

        location: formData.location,
        employmentType: formData.employmentType,
        openings: Number(formData.openings),
        applicationDeadline: formData.applicationDeadline,
        status: formData.status,
      };

      await updateJob(id, jobData);

      alert("Job updated successfully!");

      navigate("/admin");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "30px" }}>
          <h2>Loading...</h2>
        </div>
      </>
    );
  }

  return (
   <>
    <Navbar />

    <div className="edit-page">

        <div className="edit-card">

            <h1 className="edit-title">
                Edit Job
            </h1>

            <p className="edit-subtitle">
                Update the details of this job posting.
            </p>
    {/* form goes here */}

        <form onSubmit={handleSubmit}>

          {/* Company */}
          <div className="form-group">
  <label>Company</label>

  <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
          />
</div>
          <br /><br />

          {/* Company Logo */}
         <div className="form-group">
  <label>Company Logo</label>

   <input
            type="text"
            name="companyLogo"
            placeholder="Company Logo URL"
            value={formData.companyLogo && (
    <div
        style={{
            marginTop: "20px",
            textAlign: "center",
        }}
    >
        <p>
            Company Logo Preview
        </p>

        <img
            src={formData.companyLogo}
            alt="Company"
            className="logo-preview"
        />
    </div>
)}
            onChange={handleChange}
          />
        </div>
          <br /><br />

          {/* Position */}
          <div className="form-group">
  <label>Position</label>

 <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
          />
</div>
          <br /><br />

          {/* Description */}
          <div className="form-group">
  <label>discription</label>

 <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
</div>
          <br /><br />

          {/* Skills */}
          <div className="form-group">
  <label>Skills</label>

 <input
            type="text"
            name="skills"
            placeholder="React, Node.js, MongoDB"
            value={formData.skills}
            onChange={handleChange}
          />
</div>
          <br /><br />

          {/* Experience */}
         <div className="form-group">
  <label>Experience</label>

   <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
          />
</div>
          <br /><br />

          {/* Salary */}
          <div className="form-group">
  <label>Minimum salary</label>

  <input
            type="number"
            name="salaryMin"
            placeholder="Minimum Salary"
            value={formData.salaryMin}
            onChange={handleChange}
          />
</div>
          <br /><br />

         <div className="form-group">
  <label>Maximum salary</label>

   <input
            type="number"
            name="salaryMax"
            placeholder="Maximum Salary"
            value={formData.salaryMax}
            onChange={handleChange}
          />
</div>
          <br /><br />

          {/* Location */}
          <div className="form-group">
  <label>Location</label>

  <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
</div>
          <br /><br />

          {/* Employment Type */}
         <div className="form-group">
  <label>Employment Type</label>

   <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
</div>

          <br /><br />

          {/* Openings */}
         <div className="form-group">
  <label>Openings</label>

   <input
            type="number"
            name="openings"
            value={formData.openings}
            onChange={handleChange}
          />

</div>
          <br /><br />

          {/* Deadline */}
          <div className="form-group">
  <label>Application Deadline</label>

 <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
          />

</div>
          <br /><br />

          {/* Status */}
          <div className="form-group">
  <label>Status</label>

  <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Coming Soon">Coming Soon</option>
            <option value="Closed">Closed</option>
          </select>
</div>

          <br /><br />

         <div className="button-row">

<button
    className="save-btn"
    type="submit"
>
   <>
    💾 Save Changes
</>
</button>

<button
    className="cancel-btn"
    type="button"
    onClick={() => navigate("/admin")}
>
    Cancel
</button>

</div>

        </form>
      </div>

  </div>
    </>
  );
}

export default EditJob;