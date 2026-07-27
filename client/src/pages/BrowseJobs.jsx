import { useEffect, useState } from "react";
import { getPublicJobs } from "../services/publicJobService";
import { applyForJob } from "../services/applicationService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar"

function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getPublicJobs();
      setJobs(data.jobs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const filteredJobs = jobs.filter((job) => {
  const matchesSearch =
    job.position.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || job.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  if (loading) {
    return <h2>Loading jobs...</h2>;
  }

  return (
    <>
  <Navbar />

  <div style={styles.container}>
    <h1>Browse Jobs</h1>
    
    <div style={{ padding: "20px" }}>
      <div style={styles.searchContainer}>
  <input
    type="text"
    placeholder="Search by company, position or location..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={styles.searchInput}
  />
</div>
<select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  style={styles.filter}
>
  <option value="All">All Jobs</option>
  <option value="Available">Available</option>
  <option value="Coming Soon">Coming Soon</option>
  <option value="Closed">Closed</option>
</select>

      <h1 style={{ marginBottom: "8px" }}>
        Browse Jobs
      </h1>

<p style={{ color: "#666", marginBottom: "30px" }}>
  Find your next opportunity from top employers.
</p>
      <p style={{ marginBottom: "20px", color: "#555" }}>
        Showing {filteredJobs.length} job
        {filteredJobs.length !== 1 ? "s" : ""}
      </p>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <div style={styles.jobsGrid}>
  {filteredJobs.map((job) => (
          <div
  key={job._id}
  style={{
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
  }}
>
  {/* Header */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <h2 style={{ margin: 0 }}>{job.position}</h2>
      <h3 style={{ marginTop: "5px", color: "#555" }}>
        {job.company}
      </h3>
    </div>
    <div>
      <img
   src={job.companyLogo}
   alt={job.company}
   style={{
      width: 60,
      height: 60,
      objectFit: "contain",
      borderRadius: "10px"
   }}
   
/>

    </div>

    <span
      style={{
        padding: "8px 15px",
        borderRadius: "20px",
        color: "#fff",
        fontWeight: "bold",
        background:
          job.status === "Available"
            ? "#22c55e"
            : job.status === "Coming Soon"
            ? "#f59e0b"
            : "#ef4444",
      }}
    >
      {job.status}
    </span>
  </div>

  <p style={styles.description}>
  {job.description}
</p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "10px",
      marginTop: "15px",
    }}
  >
    <p>
      <strong>📍 Location:</strong> {job.location}
    </p>

    <p>
      <strong>💼 Experience:</strong> {job.experience}
    </p>

    <p>
      <strong>💰 Salary:</strong> ₹{job.salary.min} - ₹
      {job.salary.max}
    </p>

    <p>
      <strong>🕒 Type:</strong> {job.employmentType}
    </p>
  </div>

  <div style={{ marginTop: "15px" }}>
    <strong>Skills:</strong>

    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginTop: "10px",
      }}
    >
      {job.skills.map((skill) => (
        <span
          key={skill}
          style={{
            background: "#e0edff",
            color: "#2563eb",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  </div>

  <div
    style={{
      display: "flex",
      gap: "10px",
      marginTop: "25px",
    }}
  >
    <Link to={`/jobs/${job._id}`}>
      <button style={styles.detailsBtn}>
        View Details
      </button>
    </Link>

    {job.status === "Available" ? (
      <button
        style={styles.applyBtn}
        onClick={async () => {
          try {
            await applyForJob(job._id);
            toast.success("Application submitted!");
          } catch (error) {
            toast.error(
              error.response?.data?.message ||
                "Something went wrong"
            );
          }
        }}
      >
        Apply Now
      </button>
    ) : (
      <button style={styles.disabledBtn} disabled>
        {job.status}
      </button>
    )}
  </div>
</div>
         ))}
</div>
      )}
    </div>
     </div>
</>
  );
}

export default BrowseJobs;

const styles = {
  detailsBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  applyBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  disabledBtn: {
    background: "#d1d5db",
    color: "#555",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "not-allowed",
    fontWeight: "bold",
  },
  searchContainer: {
  marginBottom: "25px",
},

searchInput: {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
  outline: "none",
},
filter: {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  marginBottom: "20px",
},
jobsGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "25px",
},
description: {
  overflowWrap: "break-word",
  wordBreak: "break-word",
}
};