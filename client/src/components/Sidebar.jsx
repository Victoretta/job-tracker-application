import { NavLink, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside style={styles.sidebar}>
      <div>
        {/* <h2 style={styles.logo}>
          Job Tracker
        </h2> */}

        <nav>
          <NavLink
            to="/admin"
            end
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.active : {}),
            })}
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>


          <NavLink
          to="/admin/users"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.active : {}),
          })}
        >
          <FaUserShield />
          Users
        </NavLink>

          <NavLink
            to="/admin/jobs"
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.active : {}),
            })}
          >
            <FaBriefcase />
            Jobs
          </NavLink>

          <NavLink
            to="/admin/applications"
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.active : {}),
            })}
          >
            <FaUsers />
            Applications
          </NavLink>

          <NavLink
            to="/admin/analytics"
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.active : {}),
            })}
          >
            <FaChartBar />
            Analytics
          </NavLink>

          <NavLink
            to="#"
            style={styles.link}
          >
            <FaCog />
            Settings
            <span style={styles.badge}>
              Soon
            </span>
          </NavLink>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        style={styles.logout}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    background: "#1e293b",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "25px 20px",
    position: "fix",
    top: 0,
    left: 0,
    overflowY: "auto",
  },

  logo: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#cbd5e1",
    textDecoration: "none",
    padding: "12px 15px",
    borderRadius: "8px",
    marginBottom: "10px",
    transition: "0.3s",
    fontWeight: "500",
  },

  active: {
    background: "#2563eb",
    color: "#fff",
  },

  badge: {
    marginLeft: "auto",
    background: "#f59e0b",
    color: "#fff",
    fontSize: "10px",
    padding: "2px 6px",
    borderRadius: "10px",
  },

  logout: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "bold",
    fontSize: "15px",
  },
};

export default Sidebar;