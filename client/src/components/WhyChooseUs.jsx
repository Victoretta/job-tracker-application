import {
  FaShieldAlt,
  FaBolt,
  FaGlobe,
  FaChartLine,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Companies",
      description:
        "Every company is verified before posting jobs to ensure quality opportunities.",
    },
    {
      icon: <FaBolt />,
      title: "Quick Applications",
      description:
        "Apply to your dream job in just one click with your saved profile.",
    },
    {
      icon: <FaChartLine />,
      title: "Career Growth",
      description:
        "Discover opportunities from startups to multinational companies.",
    },
    {
      icon: <FaGlobe />,
      title: "Remote Jobs",
      description:
        "Explore remote opportunities from companies across the world.",
    },
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Why Choose Job Tracker?</h2>

      <p style={styles.subtitle}>
        Everything you need to find your next career opportunity.
      </p>

      <div style={styles.grid}>
        {features.map((feature, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.icon}>{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 8%",
    background: "#fff",
    textAlign: "center",
  },

  title: {
    fontSize: "38px",
    marginBottom: "15px",
  },

  subtitle: {
    color: "#666",
    marginBottom: "60px",
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "25px",
  },

  card: {
    padding: "35px",
    borderRadius: "15px",
    background: "#f8fafc",
    transition: ".3s",
    boxShadow: "0 8px 20px rgba(0,0,0,.05)",
  },

  icon: {
    fontSize: "45px",
    color: "#2563eb",
    marginBottom: "20px",
  },
};

export default WhyChooseUs;