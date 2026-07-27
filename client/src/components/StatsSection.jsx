import {
  FaBriefcase,
  FaUsers,
  FaBuilding,
  FaUserCheck,
} from "react-icons/fa";

function StatsSection() {
  const stats = [
    {
      icon: <FaBriefcase size={35} />,
      number: "250+",
      title: "Jobs Posted",
    },
    {
      icon: <FaBuilding size={35} />,
      number: "80+",
      title: "Companies",
    },
    {
      icon: <FaUsers size={35} />,
      number: "1200+",
      title: "Applicants",
    },
    {
      icon: <FaUserCheck size={35} />,
      number: "450+",
      title: "Successful Hires",
    },
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Our Platform in Numbers</h2>

      <p style={styles.subheading}>
        Helping recruiters connect with talented professionals every day.
      </p>

      <div style={styles.grid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.icon}>{stat.icon}</div>

            <h1>{stat.number}</h1>

            <p>{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 40px",
    background: "#ffffff",
    textAlign: "center",
  },

  heading: {
    fontSize: "38px",
    marginBottom: "10px",
  },

  subheading: {
    color: "#666",
    marginBottom: "50px",
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "30px",
  },

  card: {
    background: "#f8fafc",
    padding: "35px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
    transition: ".3s",
  },

  icon: {
    color: "#2563eb",
    marginBottom: "20px",
  },
};

export default StatsSection;