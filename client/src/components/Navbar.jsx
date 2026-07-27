import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!user;
const isAdmin = user?.role === "admin";

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <nav style={styles.navbar}>
     <Link to="/" style={styles.logo}>
  Job Tracker
</Link>

      <div style={styles.right}>
  {!isLoggedIn ? (
    <>
      <Link style={styles.link} to="/">
        Home
      </Link>

      <Link style={styles.link} to="/about">
        About
      </Link>

      <Link style={styles.link} to="/contact">
        Contact
      </Link>

      <Link style={styles.link} to="/login">
        Login
      </Link>

      <Link style={styles.registerBtn} to="/register">
        Register
      </Link>
    </>
  ) : (
    <>
      <Link style={styles.link} to="/">
        Home
      </Link>
      <Link style={styles.link} to="/about">
        About
      </Link>

      <Link style={styles.link} to="/contact">
        Contact
      </Link>

      {isAdmin ? (
        <>
          {/* <Link style={styles.link} to="/admin">
            Dashboard
          </Link> */}

          {/* <Link style={styles.link} to="/admin/jobs">
            Jobs
          </Link>

          <Link style={styles.link} to="/admin/analytics">
            Analytics
          </Link> */}
        </>
      ) : (
        <>
          {/* <Link style={styles.link} to="/jobs">
            Browse Jobs
          </Link> */}

          {/* <Link style={styles.link} to="/my-applications">
            My Applications
          </Link> */}

          {/* <Link style={styles.link} to="/dashboard">
            Dashboard
          </Link> */}
        </>
      )}

      <div style={styles.icon}>
        <FaBell size={20} />
      </div>

      <div
        style={styles.profileContainer}
        ref={menuRef}
      >
        <div
          style={styles.avatar}
          onClick={() => setOpen(!open)}
        >
          {user.profileImage ? (
            <img
              src={`http://localhost:5000${user.profileImage}`}
              alt="Profile"
              style={styles.image}
            />
          ) : (
            <FaUserCircle size={36} />
          )}
        </div>

        {open && (
          <div style={styles.dropdown}>
            <div style={styles.header}>
              <strong>{user.name}</strong>

              <p>{user.email}</p>
            </div>

            <Link to="/profile" style={styles.item}>
              My Profile
            </Link>

            <Link
              to={isAdmin ? "/admin" : "/dashboard"}
              style={styles.item}
            >
              Dashboard
            </Link>

            <Link to="/settings" style={styles.item}>
              Settings
            </Link>

            <button
              style={styles.logout}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  )}
</div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#1e293b",
    color: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,.1)",
  },

  logo: {
  color: "#fff",
  textDecoration: "none",
  fontSize: "30px",
  fontWeight: "bold",
},

  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
  },

  icon: {
    cursor: "pointer",
  },

  profileContainer: {
    position: "relative",
  },

  avatar: {
    cursor: "pointer",
  },

  image: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
  },

  dropdown: {
    position: "absolute",
    right: 0,
    top: "50px",
    width: "250px",
    background: "#fff",
    color: "#333",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,.2)",
    zIndex: 1000,
  },

  header: {
    padding: "20px",
    borderBottom: "1px solid #eee",
  },

  item: {
    display: "block",
    padding: "15px 20px",
    color: "#333",
    textDecoration: "none",
    borderBottom: "1px solid #eee",
  },
  registerBtn: {
  background: "#2563eb",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
},

  logout: {
    width: "100%",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    padding: "15px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Navbar;