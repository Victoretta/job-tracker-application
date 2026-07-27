import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function ProfileMenu({ user, logout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div style={styles.container} ref={menuRef}>
      <div
        style={styles.avatar}
        onClick={() => setOpen(!open)}
      >
        {user?.profileImage ? (
         <img
            src={`http://localhost:5000${user.profileImage}`}
            alt="Profile"
            style={styles.image}
            />
        ) : (
          <FaUserCircle size={40} />
        )}
      </div>

      {open && (
        <div style={styles.dropdown}>
          <div style={styles.header}>
            <strong>{user?.name}</strong>

            <p>{user?.email}</p>
          </div>

          <Link style={styles.item} to="/profile">
            <FaUser />
            My Profile
          </Link>

          <Link style={styles.item} to="/settings">
            <FaCog />
            Settings
          </Link>

          <button
            onClick={logout}
            style={styles.logout}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
  },

  avatar: {
    cursor: "pointer",
  },

  image: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    objectFit: "cover",
  },

  dropdown: {
    position: "absolute",
    top: 55,
    right: 0,
    width: 250,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,.15)",
    overflow: "hidden",
    zIndex: 1000,
  },

  header: {
    padding: 20,
    borderBottom: "1px solid #eee",
  },

  item: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: 15,
    color: "#333",
    textDecoration: "none",
  },

  logout: {
    width: "100%",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    padding: 15,
    cursor: "pointer",
  },
};

export default ProfileMenu;