import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import JobForm from "../components/JobForm";
import { createJob } from "../services/jobService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    companyLogo: null,
    position: "",
    experience: "",
    salaryMin: "",
    salaryMax: "",
    location: "",
    openings: 1,
    employmentType: "Full-Time",
    status: "Available",
    applicationDeadline: "",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    // Handle file input
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        companyLogo: e.target.files[0],
      });
      return;
    }

    // Handle other inputs
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();

      data.append("company", formData.company);
      data.append("position", formData.position);
      data.append("description", formData.description);
      data.append("experience", formData.experience);

      data.append("location", formData.location);
      data.append("employmentType", formData.employmentType);
      data.append("openings", formData.openings);
      data.append(
        "applicationDeadline",
        formData.applicationDeadline
      );
      data.append("status", formData.status);

      data.append("skills", formData.skills);

      data.append(
        "salary",
        JSON.stringify({
          min: Number(formData.salaryMin),
          max: Number(formData.salaryMax),
          currency: "INR",
          period: "Year",
        })
      );

      if (formData.companyLogo) {
        data.append("companyLogo", formData.companyLogo);
      }

      await createJob(data);

      toast.success("Job created successfully");

      navigate("/admin/jobs");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
            background: "#f4f6f9",
          }}
        >
          <h1>Create Job</h1>

          <JobForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}

export default CreateJob;