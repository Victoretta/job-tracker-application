import Navbar from "../components/Navbar";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Contact() {
  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1>Contact Us</h1>

        <p style={styles.subtitle}>
          We'd love to hear from you. Reach out using the details below.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <FaEnvelope size={35} color="#2563eb" />
            <h3>Email</h3>
            <p>obasivictoretta@gmail.com</p>
          </div>

          <div style={styles.card}>
            <FaPhone size={35} color="#2563eb" />
            <h3>Phone</h3>
            <p>+237 677944705</p>
          </div>

          <div style={styles.card}>
            <FaMapMarkerAlt size={35} color="#2563eb" />
            <h3>Address</h3>
            <p>Banur, Punjab, India</p>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "60px 8%",
    minHeight: "100vh",
    background: "#f8fafc",
    textAlign: "center",
  },

  subtitle: {
    color: "#666",
    marginBottom: "50px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
  },
};

export default Contact;