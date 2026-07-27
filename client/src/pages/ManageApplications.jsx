import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFilePdf,
} from "react-icons/fa";

import {
  getApplicationsForJob,
  updateApplicationStatus,
} from "../services/applicationService";

function ManageApplications() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  const fetchApplications = async () => {
    try {
      const data = await getApplicationsForJob(jobId);
      setApplications(data.applications || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      toast.success("Application status updated!");
      fetchApplications();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredApplications = applications.filter((application) =>
    application.applicant?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={styles.container}>
          <div style={styles.header}>
            <h1>Applications</h1>

            <p>
              Review applicants and manage their recruitment process.
            </p>
          </div>

          {/* Statistics */}
          <div style={styles.stats}>
            <div style={styles.statCard}>
              <h2>{applications.length}</h2>
              <p>Total Applicants</p>
            </div>

            <div style={styles.statCard}>
              <h2>
                {
                  applications.filter(
                    (app) => app.status === "Interview"
                  ).length
                }
              </h2>

              <p>Interview</p>
            </div>

            <div style={styles.statCard}>
              <h2>
                {
                  applications.filter(
                    (app) => app.status === "Shortlisted"
                  ).length
                }
              </h2>

              <p>Shortlisted</p>
            </div>

            <div style={styles.statCard}>
              <h2>
                {
                  applications.filter(
                    (app) => app.status === "Hired"
                  ).length
                }
              </h2>

              <p>Hired</p>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search applicant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />

          {filteredApplications.length === 0 ? (
            <div style={styles.empty}>
              <h3>No Applications Found</h3>
            </div>
          ) : (
            <div style={styles.grid}>
              {filteredApplications.map((application) => (
                <div
                  key={application._id}
                  style={styles.card}
                >
                  <div style={styles.top}>
                    <img
                      src={
                        application.applicant?.profileImage
                          ? `http://localhost:5000${application.applicant.profileImage}`
                          : "https://via.placeholder.com/80"
                      }
                      alt={application.applicant?.name}
                      style={styles.avatar}
                    />

                    <div>
                      <h3 style={{ margin: 0 }}>
                        {application.applicant?.name}
                      </h3>

                      <StatusBadge
                        status={application.status}
                      />
                    </div>
                  </div>

                  <div style={styles.info}>
                    <FaEnvelope color="#2563eb" />
                    {application.applicant?.email}
                  </div>

                  <div style={styles.info}>
                    <FaPhone color="#16a34a" />
                    {application.applicant?.phone ||
                      "Not Provided"}
                  </div>

                  <div style={styles.info}>
                    <FaMapMarkerAlt color="#dc2626" />
                    {application.applicant?.location ||
                      "Not Provided"}
                  </div>

                  <a
                    href={
                      application.resume
                        ? `http://localhost:5000${application.resume}`
                        : "#"
                    }
                    target="_blank"
                    rel="noreferrer"
                    style={styles.resumeBtn}
                  >
                    <FaFilePdf />
                    View Resume
                  </a>

                  <div style={{ marginTop: "20px" }}>
                    <label
                      style={{ fontWeight: "bold" }}
                    >
                      Change Status
                    </label>

                    <select
                      value={application.status}
                      onChange={(e) =>
                        changeStatus(
                          application._id,
                          e.target.value
                        )
                      }
                      style={styles.select}
                    >
                      <option>Applied</option>
                      <option>Under Review</option>
                      <option>Shortlisted</option>
                      <option>Interview</option>
                      <option>Rejected</option>
                      <option>Hired</option>
                    </select>
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

const styles = {
  container: {
    flex: 1,
    padding: "30px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "30px",
  },

  stats: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,.08)",
  },

  search: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "30px",
    fontSize: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(360px,1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,.08)",
    transition: ".3s",
  },

  top: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    marginBottom: "20px",
  },

  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #ddd",
  },

  info: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
    color: "#555",
  },

  resumeBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "bold",
    marginTop: "10px",
  },

  select: {
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
  },

  empty: {
    textAlign: "center",
    background: "#fff",
    padding: "60px",
    borderRadius: "12px",
    color: "#777",
  },
};

export default ManageApplications;