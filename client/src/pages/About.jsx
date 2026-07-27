import Navbar from "../components/Navbar";
import {
  FaBullseye,
  FaEye,
  FaUsers,
  FaHandshake,
} from "react-icons/fa";

function About() {
  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>About Job Tracker</h1>

        <p style={styles.intro}>
          Job Tracker is a modern recruitment platform designed to connect
          talented job seekers with trusted employers. Whether you're looking
          for your first internship or your next career move, our platform
          makes finding and applying for jobs simple and efficient.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <FaBullseye size={40} color="#2563eb" />
            <h3>Our Mission</h3>
            <p>
              To simplify recruitment and help people discover meaningful
              career opportunities.
            </p>
          </div>

          <div style={styles.card}>
            <FaEye size={40} color="#2563eb" />
            <h3>Our Vision</h3>
            <p>
              To become one of the most trusted job portals for students,
              professionals, and recruiters worldwide.
            </p>
          </div>

          <div style={styles.card}>
            <FaUsers size={40} color="#2563eb" />
            <h3>Community</h3>
            <p>
              Thousands of applicants and recruiters can connect through one
              easy-to-use platform.
            </p>
          </div>

          <div style={styles.card}>
            <FaHandshake size={40} color="#2563eb" />
            <h3>Trust</h3>
            <p>
              We focus on verified companies and transparent recruitment.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "60px 8%",
    background: "#f8fafc",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    fontSize: "42px",
    marginBottom: "20px",
  },

  intro: {
    textAlign: "center",
    maxWidth: "850px",
    margin: "0 auto 50px",
    color: "#555",
    lineHeight: "1.8",
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
  },
};

export default About;