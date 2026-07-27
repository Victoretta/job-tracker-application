import { FaPlus, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <h3>Quick Actions</h3>

      <button
        style={styles.button}
        onClick={() => navigate("/admin/jobs/create")}
      >
        <FaPlus /> Create Job
      </button>

      <button
        style={styles.button}
        onClick={() => navigate("/admin/jobs")}
      >
        <FaBriefcase /> View Jobs
      </button>
    </div>
  );
}

const styles = {
  button: {
    display: "block",
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#2563eb",
    color: "#fff",
  },
};

export default QuickActions;