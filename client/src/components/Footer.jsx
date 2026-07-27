import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Company */}
        <div>
          <h2 style={styles.logo}>Job Tracker</h2>

          <p style={styles.text}>
            Connecting talented people with amazing companies.
            Find your dream career faster and easier.
          </p>

          <div style={styles.socials}>
            <a href="#" style={styles.icon}>
              <FaFacebook />
            </a>

            <a href="#" style={styles.icon}>
              <FaTwitter />
            </a>

            <a href="#" style={styles.icon}>
              <FaLinkedin />
            </a>

            <a href="#" style={styles.icon}>
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>

          <Link to="/" style={styles.link}>
            Home
          </Link>

          <Link to="/jobs" style={styles.link}>
            Browse Jobs
          </Link>

          <Link to="/about" style={styles.link}>
            About Us
          </Link>

          <Link to="/contact" style={styles.link}>
            Contact
          </Link>
        </div>

        {/* For Applicants */}
        <div>
          <h3>Applicants</h3>

          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>

          <Link to="/my-applications" style={styles.link}>
            My Applications
          </Link>

          <Link to="/profile" style={styles.link}>
            Profile
          </Link>
        </div>

        {/* Contact */}
        <div>
          <h3>Contact</h3>

          <p style={styles.contact}>
            <FaEnvelope /> support@jobtracker.com
          </p>

          <p style={styles.contact}>
            <FaPhone /> +237 677944705
          </p>

          <p style={styles.contact}>
            <FaMapMarkerAlt /> Punjab, India
          </p>
        </div>
      </div>

      <hr style={styles.line} />

      <div style={styles.bottom}>
        © {year} Job Tracker. All Rights Reserved by Obasi Victor Etta.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#0f172a",
    color: "#fff",
    paddingTop: "60px",
    marginTop: "80px",
  },

  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
    gap: "40px",
    maxWidth: "1200px",
    margin: "auto",
    padding: "0 30px 50px",
  },

  logo: {
    marginBottom: "15px",
  },

  text: {
    color: "#cbd5e1",
    lineHeight: 1.8,
  },

  socials: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },

  icon: {
    color: "#fff",
    fontSize: "22px",
    transition: ".3s",
  },

  link: {
    display: "block",
    color: "#cbd5e1",
    textDecoration: "none",
    marginBottom: "12px",
  },

  contact: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#cbd5e1",
    marginBottom: "15px",
  },

  line: {
    borderColor: "#334155",
  },

  bottom: {
    textAlign: "center",
    padding: "20px",
    color: "#94a3b8",
  },
};

export default Footer;