import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  getApplicantDashboard,
  getMyApplications,
} from "../services/applicationService";

import {
  FaBriefcase,
  FaClipboardList,
  FaUserEdit,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalApplications: 0,
    applied: 0,
    underReview: 0,
    interviews: 0,
    shortlisted: 0,
    hired: 0,
    rejected: 0,
  });

  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchApplications();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getApplicantDashboard();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const data = await getMyApplications();

      setRecentApplications(
        (data.applications || []).slice(0, 5)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const successRate =
    stats.totalApplications > 0
      ? Math.round(
          (stats.hired / stats.totalApplications) * 100
        )
      : 0;

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        {/* HERO */}

        <div style={styles.hero}>
          <div>
            <h1>
              Welcome back, {user?.name} 👋
            </h1>

            <p>
              Keep track of your job applications and
              opportunities.
            </p>
          </div>

          {user?.profileImage ? (
            <img
              src={`http://localhost:5000${user.profileImage}`}
              alt=""
              style={styles.avatar}
            />
          ) : (
            <div style={styles.avatarPlaceholder}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* STATISTICS */}

        <div style={styles.grid}>
          <StatCard
            icon={<FaClipboardList />}
            title="Applications"
            value={stats.totalApplications}
            color="#2563eb"
          />

          <StatCard
            icon={<FaClock />}
            title="Under Review"
            value={stats.underReview}
            color="#f59e0b"
          />

          <StatCard
            icon={<FaSearch />}
            title="Interviews"
            value={stats.interviews}
            color="#8b5cf6"
          />

          <StatCard
            icon={<FaCheckCircle />}
            title="Hired"
            value={stats.hired}
            color="#16a34a"
          />

          <StatCard
            icon={<FaBriefcase />}
            title="Shortlisted"
            value={stats.shortlisted}
            color="#0891b2"
          />

          <StatCard
            icon={<FaTimesCircle />}
            title="Rejected"
            value={stats.rejected}
            color="#dc2626"
          />
        </div>

        {/* SUCCESS */}

        <div style={styles.successCard}>
          <h2>Application Success Rate</h2>

          <h1>{successRate}%</h1>

          <p>
            You've been hired for {stats.hired} out of{" "}
            {stats.totalApplications} applications.
          </p>
        </div>

        {/* QUICK ACTIONS */}

        <div style={styles.section}>
          <h2>Quick Actions</h2>

          <div style={styles.actions}>
            <Link to="/jobs" style={styles.button}>
              Browse Jobs
            </Link>

            <Link
              to="/my-applications"
              style={styles.button}
            >
              My Applications
            </Link>

            <Link
              to="/profile"
              style={styles.button}
            >
              <FaUserEdit />
              Edit Profile
            </Link>
          </div>
        </div>

        {/* RECENT APPLICATIONS */}

        <div style={styles.section}>
          <h2>Recent Applications</h2>

          {recentApplications.length === 0 ? (
            <div style={styles.empty}>
              <h3>No applications yet</h3>

              <p>
                Browse jobs and submit your first
                application.
              </p>

              <Link
                to="/jobs"
                style={styles.primaryButton}
              >
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div style={styles.applicationGrid}>
              {recentApplications.map((app) => (
                <div
                  key={app._id}
                  style={styles.applicationCard}
                >
                  <h3>{app.job?.position}</h3>

                  <p>{app.job?.company}</p>

                  <p>
                    Applied:
                    {" "}
                    {new Date(
                      app.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <span
                    style={{
                      ...styles.status,
                      background:
                        app.status === "Hired"
                          ? "#16a34a"
                          : app.status === "Rejected"
                          ? "#dc2626"
                          : app.status ===
                            "Interview"
                          ? "#8b5cf6"
                          : "#f59e0b",
                    }}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        ...styles.card,
        borderTop: `5px solid ${color}`,
      }}
    >
      <div
        style={{
          fontSize: 35,
          color,
          marginBottom: 10,
        }}
      >
        {icon}
      </div>

      <h2>{value}</h2>

      <p>{title}</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  hero: {
    background: "#2563eb",
    color: "#fff",
    padding: "35px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px",
    flexWrap: "wrap",
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid white",
  },

  avatarPlaceholder: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "#fff",
    color: "#2563eb",
    fontSize: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "35px",
  },

  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,.08)",
  },

  successCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    marginBottom: "35px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,.08)",
  },

  section: {
    marginBottom: "35px",
  },

  actions: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  button: {
    textDecoration: "none",
    background: "#2563eb",
    color: "#fff",
    padding: "14px 22px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "bold",
  },

  applicationGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "20px",
  },

  applicationCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
  },

  status: {
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "20px",
    display: "inline-block",
    marginTop: "10px",
    fontWeight: "bold",
  },

  empty: {
    background: "#fff",
    textAlign: "center",
    padding: "60px",
    borderRadius: "15px",
  },

  primaryButton: {
    display: "inline-block",
    marginTop: "20px",
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};

export default Dashboard;