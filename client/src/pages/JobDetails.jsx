import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import { getJobById } from "../services/jobService";
import {
  applyForJob,
  checkApplication,
} from "../services/applicationService";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaUsers,
  FaCalendarAlt,
  FaAward,
  FaArrowLeft,
} from "react-icons/fa";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const data = await getJobById(id);
      setJob(data);

      try {
        const result = await checkApplication(id);
        setHasApplied(result.applied);
      } catch (err) {
        console.log("Application check skipped", err);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load job.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);

      await applyForJob(job._id);

      setHasApplied(true);

      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to apply."
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <h2
          style={{
            textAlign: "center",
            marginTop: "60px",
          }}
        >
          Loading...
        </h2>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <h2
          style={{
            textAlign: "center",
            marginTop: "60px",
          }}
        >
          Job not found.
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <button
          onClick={() => navigate(-1)}
          style={styles.backButton}
        >
          <FaArrowLeft /> Back
        </button>

        <div style={styles.card}>
          {/* Header */}

          <div style={styles.header}>
            <img
              src={
                job.companyLogo
                  ? `http://localhost:5000${job.companyLogo}`
                  : "https://via.placeholder.com/100?text=Logo"
              }
              alt={job.company}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/100?text=Logo";
              }}
              style={styles.logo}
            />

            <div>
              <h1 style={{ marginBottom: "8px" }}>
                {job.position}
              </h1>

              <h2
                style={{
                  color: "#2563eb",
                  marginTop: 0,
                }}
              >
                {job.company}
              </h2>

              <StatusBadge status={job.status} />
            </div>
          </div>

          {/* Job Information */}

          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <FaMapMarkerAlt color="#2563eb" />
              <span>{job.location || "Remote"}</span>
            </div>

            <div style={styles.infoCard}>
              <FaMoneyBillWave color="#16a34a" />
              <span>
                {job.salaryMin && job.salaryMax
                  ? `₹${job.salaryMin} - ₹${job.salaryMax}`
                  : "Salary Negotiable"}
              </span>
            </div>

            <div style={styles.infoCard}>
              <FaAward color="#f59e0b" />
              <span>{job.experience || "Not specified"}</span>
            </div>

            <div style={styles.infoCard}>
              <FaBriefcase color="#9333ea" />
              <span>{job.employmentType}</span>
            </div>

            <div style={styles.infoCard}>
              <FaUsers color="#dc2626" />
              <span>{job.openings} Openings</span>
            </div>

            <div style={styles.infoCard}>
              <FaCalendarAlt color="#0d6efd" />
              <span>
                {job.applicationDeadline
                  ? new Date(
                      job.applicationDeadline
                    ).toLocaleDateString()
                  : "No Deadline"}
              </span>
            </div>
          </div>

          {/* Description */}

          <div style={styles.section}>
            <h2>Job Description</h2>

            <p style={{ lineHeight: "1.8" }}>
              {job.description}
            </p>
          </div>

          {/* Skills */}

          <div style={styles.section}>
            <h2>Required Skills</h2>

            <div style={styles.skills}>
              {job.skills?.length > 0 ? (
                job.skills.map((skill) => (
                  <span
                    key={skill}
                    style={styles.skill}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p>No skills specified.</p>
              )}
            </div>
          </div>

          {/* Apply Button */}

          <button
            onClick={handleApply}
            disabled={hasApplied || applying}
            style={{
              ...styles.applyBtn,
              background: hasApplied
                ? "#6c757d"
                : "#2563eb",
              cursor:
                hasApplied || applying
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {applying
              ? "Submitting..."
              : hasApplied
              ? "✓ Already Applied"
              : "Apply Now"}
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    background: "#f4f6f9",
    minHeight: "100vh",
    padding: "40px 20px",
  },

  backButton: {
    marginBottom: "20px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  card: {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "15px",
    padding: "35px",
    boxShadow: "0 5px 20px rgba(0,0,0,.08)",
  },

  header: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
    marginBottom: "35px",
    flexWrap: "wrap",
  },

  logo: {
    width: "100px",
    height: "100px",
    borderRadius: "15px",
    objectFit: "cover",
    border: "1px solid #ddd",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px",
    marginBottom: "35px",
  },

  infoCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "10px",
    background: "#fafafa",
    fontWeight: "500",
  },

  section: {
    marginBottom: "35px",
  },

  skills: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  skill: {
    background: "#dbeafe",
    color: "#2563eb",
    padding: "8px 16px",
    borderRadius: "20px",
    fontWeight: "600",
  },

  applyBtn: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default JobDetails;