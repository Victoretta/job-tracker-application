import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyApplications } from "../services/applicationService";
import {
  FaBuilding,
  FaCalendarAlt,
  FaFileAlt,
  FaBriefcase,
} from "react-icons/fa";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data.applications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "#2563eb";

      case "Under Review":
        return "#f59e0b";

      case "Shortlisted":
        return "#7c3aed";

      case "Interview":
        return "#0891b2";

      case "Hired":
        return "#16a34a";

      case "Rejected":
        return "#dc2626";

      default:
        return "#64748b";
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={styles.loading}>Loading applications...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.header}>
          <h1>My Applications</h1>

          <p>
            Track every job you've applied for.
          </p>
        </div>

        {applications.length === 0 ? (
          <div style={styles.emptyCard}>
            <h2>No Applications Yet</h2>

            <p>
              Start applying for jobs and they'll appear here.
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {applications.map((application) => (
              <div
                key={application._id}
                style={styles.card}
              >
                <div style={styles.top}>
                  <img
                    src={
                      application.job?.companyLogo
                        ? `http://localhost:5000${application.job.companyLogo}`
                        : "https://via.placeholder.com/70"
                    }
                    alt="Company Logo"
                    style={styles.logo}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/70";
                    }}
                  />

                  <div>
                    <h2 style={styles.position}>
                      {application.job?.position}
                    </h2>

                    <p style={styles.company}>
                      <FaBuilding />
                      {application.job?.company}
                    </p>
                  </div>
                </div>

                <div style={styles.info}>
                  <p>
                    <FaBriefcase />
                    <strong>Job Status:</strong>{" "}
                    {application.job?.status}
                  </p>

                  <p>
                    <FaCalendarAlt />
                    <strong>Applied:</strong>{" "}
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <span
                  style={{
                    ...styles.badge,
                    background: getStatusColor(
                      application.status
                    ),
                  }}
                >
                  {application.status}
                </span>

                <div style={styles.resume}>
                  <FaFileAlt />

                  <div>
                    <strong>Resume</strong>

                    <p style={{ margin: 0 }}>
                      {application.resume ? (
                        <a
                          href={`http://localhost:5000${application.resume}`}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.link}
                        >
                          View Resume
                        </a>
                      ) : (
                        "Not Uploaded"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  page: {
    background: "#f8fafc",
    minHeight: "100vh",
    padding: "40px 60px",
  },

  loading: {
    textAlign: "center",
    marginTop: "120px",
    fontSize: "22px",
  },

  header: {
    marginBottom: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))",
    gap: "25px",
    alignItems: "start", // prevents tall cards
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "25px",
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
    transition: ".3s",
  },

  top: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    marginBottom: "20px",
  },

  logo: {
    width: "70px",
    height: "70px",
    borderRadius: "12px",
    objectFit: "cover",
    border: "1px solid #ddd",
  },

  position: {
    margin: 0,
    fontSize: "24px",
  },

  company: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#555",
    marginTop: "8px",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    color: "#555",
    marginBottom: "22px",
  },

  badge: {
    display: "inline-block",
    color: "#fff",
    padding: "8px 18px",
    borderRadius: "50px",
    fontWeight: "bold",
    marginBottom: "22px",
    width: "fit-content",
  },

  resume: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    borderTop: "1px solid #eee",
    paddingTop: "18px",
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
  },

  emptyCard: {
    background: "#fff",
    padding: "60px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,.08)",
  },
};

export default MyApplications;