import { FaUserCircle, FaEnvelope, FaUserShield } from "react-icons/fa";

function ProfileCard({ user }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <FaUserCircle size={70} color="#0d6efd" />

        <div>
          <h2 style={styles.name}>{user?.name || "Admin"}</h2>

          <p style={styles.role}>
            <FaUserShield /> {user?.role || "Administrator"}
          </p>
        </div>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <div style={styles.info}>
        <p>
          <FaEnvelope color="#0d6efd" />
          {" "}
          {user?.email}
        </p>

        <p>
          <strong>Last Login:</strong> Today
        </p>

        <p>
          <strong>Status:</strong>
          <span style={styles.active}> ● Online</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 5px 20px rgba(0,0,0,.08)",
    marginBottom: "30px",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  name: {
    margin: 0,
    fontSize: "28px",
    color: "#222",
  },

  role: {
    marginTop: "8px",
    color: "#666",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    fontSize: "16px",
    color: "#444",
  },

  active: {
    color: "#198754",
    fontWeight: "bold",
  },
};

export default ProfileCard;