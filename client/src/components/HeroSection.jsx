import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBriefcase } from "react-icons/fa";

function HeroSection() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) {
      navigate("/jobs");
      return;
    }

    navigate(`/jobs?search=${encodeURIComponent(search)}`);
  };

  return (
    <section style={styles.hero}>
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h1 style={styles.title}>
            Find Your <span style={{ color: "#60a5fa" }}>Dream Job</span>
            <br />
            With Top Companies
          </h1>

          <p style={styles.subtitle}>
            Explore thousands of opportunities from trusted companies and take
            the next step in your career.
          </p>

          {/* Search Box */}
          <div style={styles.searchBox}>
            <FaSearch color="#666" />

            <input
              type="text"
              placeholder="Search by company or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />

            <button
              style={styles.searchBtn}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Popular Tags */}
          <div style={styles.tags}>
            <span style={{ fontWeight: "bold" }}>Popular:</span>

            <button
              style={styles.tag}
              onClick={() => navigate("/jobs?search=React")}
            >
              React
            </button>

            <button
              style={styles.tag}
              onClick={() => navigate("/jobs?search=Node.js")}
            >
              Node.js
            </button>

            <button
              style={styles.tag}
              onClick={() => navigate("/jobs?search=Python")}
            >
              Python
            </button>

            <button
              style={styles.tag}
              onClick={() => navigate("/jobs?search=Java")}
            >
              Java
            </button>

            <button
              style={styles.tag}
              onClick={() => navigate("/jobs?search=Remote")}
            >
              Remote
            </button>
          </div>

          {/* Buttons */}
          <div style={styles.buttons}>
            <Link to="/jobs" style={{ textDecoration: "none" }}>
              <button style={styles.primaryBtn}>
                <FaBriefcase />
                Browse Jobs
              </button>
            </Link>
          </div>

          {/* Statistics */}
          <div style={styles.stats}>
            <div>
              <h2 style={styles.statNumber}>500+</h2>
              <p style={styles.statText}>Companies</p>
            </div>

            <div>
              <h2 style={styles.statNumber}>5,000+</h2>
              <p style={styles.statText}>Jobs</p>
            </div>

            <div>
              <h2 style={styles.statNumber}>10,000+</h2>
              <p style={styles.statText}>Applicants</p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.scroll}>↓ Explore Jobs</div>
    </section>
  );
}

const styles = {
  hero: {
    position: "relative",
    minHeight: "90vh",
    backgroundImage:
      "linear-gradient(rgba(15,23,42,.85), rgba(15,23,42,.85)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },

  overlay: {
    width: "100%",
    maxWidth: "1200px",
  },

  content: {
    color: "#fff",
    maxWidth: "700px",
  },

  title: {
    fontSize: "60px",
    lineHeight: 1.2,
    marginBottom: "20px",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "20px",
    color: "#d1d5db",
    marginBottom: "35px",
    lineHeight: 1.8,
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#fff",
    padding: "18px 25px",
    borderRadius: "50px",
    marginBottom: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
  },

  searchBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  tags: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "35px",
  },

  tag: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "600",
  },

  buttons: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "16px 35px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
    fontSize: "16px",
  },

  stats: {
    display: "flex",
    gap: "60px",
    marginTop: "60px",
    flexWrap: "wrap",
  },

  statNumber: {
    margin: 0,
    fontSize: "34px",
    fontWeight: "bold",
  },

  statText: {
    marginTop: "8px",
    color: "#d1d5db",
  },

  scroll: {
    position: "absolute",
    bottom: "25px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#fff",
    fontSize: "18px",
    opacity: 0.8,
  },
};

export default HeroSection;