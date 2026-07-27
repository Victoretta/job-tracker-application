import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

function JobCard({ job }) {
  const badgeColor = () => {
    switch (job.status) {
      case "Available":
        return {
          background: "#dcfce7",
          color: "#166534",
        };

      case "Coming Soon":
        return {
          background: "#fef3c7",
          color: "#92400e",
        };

      default:
        return {
          background: "#fee2e2",
          color: "#991b1b",
        };
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <img
          src={
            job.companyLogo
              ? `http://localhost:5000${job.companyLogo}`
              : "https://via.placeholder.com/80"
          }
          alt={job.company}
          style={styles.logo}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/80";
          }}
        />

        <span
          style={{
            ...styles.badge,
            ...badgeColor(),
          }}
        >
          {job.status}
        </span>
      </div>

      <h3>{job.position}</h3>

      <p style={styles.company}>{job.company}</p>

      <div style={styles.info}>
        <FaMapMarkerAlt />
        {job.location}
      </div>

      <div style={styles.info}>
        <FaBriefcase />
        {job.employmentType}
      </div>

      <div style={styles.info}>
        <FaBriefcase />
        {job.experience}
      </div>

      <div style={styles.info}>
        <FaMoneyBillWave />
        ₹{job.salary?.min?.toLocaleString()} -
        ₹{job.salary?.max?.toLocaleString()}
      </div>

      <div style={styles.skills}>
        {job.skills?.slice(0, 3).map((skill, index) => (
          <span key={index} style={styles.skill}>
            {skill}
          </span>
        ))}
      </div>

      {job.applicationDeadline && (
        <div style={styles.deadline}>
          <FaCalendarAlt />

          Apply before{" "}
          {new Date(
            job.applicationDeadline
          ).toLocaleDateString()}
        </div>
      )}

      <Link
        to={`/jobs/${job._id}`}
        style={{ textDecoration: "none" }}
      >
        <button
          style={{
            ...styles.button,

            background:
              job.status === "Available"
                ? "#2563eb"
                : job.status === "Coming Soon"
                ? "#eab308"
                : "#64748b",
          }}
        >
          {job.status === "Available"
            ? "Apply Now"
            : job.status === "Coming Soon"
            ? "Coming Soon"
            : "View Details"}
        </button>
      </Link>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
    transition: ".3s",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  logo: {
    width: 70,
    height: 70,
    borderRadius: 12,
    objectFit: "cover",
  },

  badge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  company: {
    color: "#64748b",
    marginBottom: "20px",
  },

  info: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    color: "#475569",
  },

  skills: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "15px",
  },

  skill: {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
  },

  deadline: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#dc2626",
    marginTop: "15px",
    fontWeight: "600",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default JobCard;