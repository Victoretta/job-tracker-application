import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await registerUser(formData);

      toast.success("Registration successful!");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to register"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT */}

      <div style={styles.left}>
        <FaUserPlus size={70} />

        <h1>Join Job Tracker</h1>

        <p>
          Create your account and discover thousands
          of career opportunities from top companies.
        </p>
      </div>

      {/* RIGHT */}

      <div style={styles.right}>
        <form
          onSubmit={handleSubmit}
          style={styles.card}
        >
          <h2>Create Account</h2>

          <p style={styles.subtitle}>
            Start your career journey today
          </p>

          {/* Name */}

          <div style={styles.inputBox}>
            <FaUser color="#777" />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Email */}

          <div style={styles.inputBox}>
            <FaEnvelope color="#777" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Password */}

          <div style={styles.inputBox}>
            <FaLock color="#777" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <button
              type="button"
              style={styles.eye}
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

          <p style={{ marginTop: 25 }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={styles.link}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    flexWrap: "wrap",
    background: "#f4f6f9",
  },

  left: {
    flex: 1,
    minWidth: "350px",
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px",
    textAlign: "center",
  },

  right: {
    flex: 1,
    minWidth: "350px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,.1)",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "20px",
    gap: "10px",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "15px",
  },

  eye: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#666",
  },

  button: {
    width: "100%",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;