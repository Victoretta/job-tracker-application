import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBriefcase,
} from "react-icons/fa";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
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
      const data = await loginUser(formData);

      await login(data.token);

      toast.success("Login successful!");

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT */}

      <div style={styles.left}>
        <FaBriefcase size={70} />

        <h1>Welcome Back</h1>

        <p>
          Sign in to manage your applications,
          discover opportunities, and grow your
          career.
        </p>
      </div>

      {/* RIGHT */}

      <div style={styles.right}>
        <form
          onSubmit={handleSubmit}
          style={styles.card}
        >
          <h2 style={{ marginBottom: 10 }}>
            Login
          </h2>

          <p style={styles.subtitle}>
            Access your Job Tracker account
          </p>

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
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              style={styles.eye}
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          {/* forgoting password */}

          <div style={{ marginBottom: "15px" }}>
            <Link
              to="/forgot-password"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          <p style={{ marginTop: 20 }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={styles.link}
            >
              Register
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
    boxShadow:
      "0 10px 25px rgba(0,0,0,.1)",
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

  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    fontSize: "14px",
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

export default Login;