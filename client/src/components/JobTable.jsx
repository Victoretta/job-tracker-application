import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import {
  FaEdit,
  FaTrash,
  FaUsers,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

function JobTable({ jobs, onDelete }) {
  if (jobs.length === 0) {
    return (
      <div style={styles.empty}>
        <h3>No Jobs Found</h3>
        <p>Try changing your search or create a new job.</p>
      </div>
    );
  }

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.header}>
            <th style={styles.th}>Company</th>
            <th style={styles.th}>Position</th>
            <th style={styles.th}>Salary</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Openings</th>
            <th style={styles.th}>Deadline</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
  {jobs.map((job) => {
    const expired =
      job.applicationDeadline &&
      new Date(job.applicationDeadline) < new Date();

    return (
      <tr key={job._id}
    style={styles.row}
    onMouseEnter={(e) =>
        e.currentTarget.style.background = "#f8fafc"
    }
    onMouseLeave={(e) =>
        e.currentTarget.style.background = "#fff"
    }
>
              {/* Company */}
             <td>
  <div style={styles.companyCell}>
    <img
      src={
        job.companyLogo
          ? `http://localhost:5000${job.companyLogo}`
          : "https://via.placeholder.com/50"
      }
      alt={job.company}
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/50";
      }}
      style={styles.logo}
    />

    <div>
  <strong>{job.company}</strong>

  <div
    style={{
      fontSize: "13px",
      color: "#666",
      marginTop: "4px",
    }}
  >
    {job.position}
  </div>
</div>
  </div>
</td>

              {/* Position */}
              <td style={styles.td}>{job.position}</td>

              {/* Salary */}
              <td style={styles.td}>
                <FaMoneyBillWave color="#16a34a" />{" "}
                {job.salaryMin && job.salaryMax
                  ? `₹${job.salaryMin} - ₹${job.salaryMax}`
                  : "Negotiable"}
              </td>

              {/* Location */}
              <td style={styles.td}>
                <FaMapMarkerAlt color="#2563eb" />{" "}
                {job.location || "Remote"}
              </td>

              {/* Status */}
              <td style={styles.td}>
                <StatusBadge status={job.status} />
              </td>

              {/* Openings */}
              <td style={styles.td}>{job.openings}</td>

              {/* Deadline */}
             <td
  style={{
    ...styles.td,
    color: expired ? "#dc2626" : "#333",
    fontWeight: expired ? "bold" : "normal",
  }}
>
  {job.applicationDeadline
    ? `${new Date(job.applicationDeadline).toLocaleDateString()}${
        expired ? " (Expired)" : ""
      }`
    : "N/A"}
</td>

              {/* Actions */}
              <td style={styles.td}>
                <div style={styles.actions}>
                  <Link to={`/admin/jobs/edit/${job._id}`}>
                    <button style={styles.editBtn}
                    title="Edit Job"
                    >
                      <FaEdit />
                    </button>
                  </Link>

                  <button
                    style={styles.deleteBtn}
                     title="Delete Job"
                    onClick={() => onDelete(job._id)}
                  >
                    <FaTrash />
                  </button>

                  <Link
                    to={`/admin/jobs/${job._id}/applications`}
                  >
                    <button style={styles.viewBtn}
                     title="View Applications"
                    >
                      <FaUsers />
                    </button>
                  </Link>
                </div>
              </td>
      </tr>
    );
  })}
</tbody>
      
      </table>
    </div>
  );
}

const styles = {
  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "100px",
  },

  header: {
    background: "#2563eb",
    color: "#fff",
  },

  th: {
    padding: "15px",
    textAlign: "left",
    fontSize: "15px",
  },

  td: {
    padding: "15px",
    borderBottom: "1px solid #eee",
    verticalAlign: "middle",
  },

  row: {
    transition: ".2s",
  },

  actions: {
    display: "flex",
    gap: "8px",
  },

  editBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
  },

  viewBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#777",
  },
  companyCell: {
  display: "flex",
  alignItems: "center",
  gap: "12px",
},

logo: {
  width: "45px",
  height: "45px",
  borderRadius: "8px",
  objectFit: "cover",
  border: "1px solid #ddd",
},
};

export default JobTable;