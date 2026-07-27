import { useEffect, useState } from "react";
import { getPublicJobs } from "../services/publicJobService";

function TopCompanies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const data = await getPublicJobs();

      const companyMap = {};

      (data.jobs || []).forEach((job) => {
        if (!companyMap[job.company]) {
          companyMap[job.company] = {
            name: job.company,
            logo: job.companyLogo,
            jobs: 1,
          };
        } else {
          companyMap[job.company].jobs++;
        }
      });

      const sorted = Object.values(companyMap).sort(
        (a, b) => b.jobs - a.jobs
      );

      setCompanies(sorted.slice(0, 8));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>🏢 Top Companies Hiring</h2>

      <p style={styles.subtitle}>
        Discover companies actively recruiting talented professionals.
      </p>

      <div style={styles.grid}>
        {companies.map((company) => (
          <div key={company.name} style={styles.card}>
            <img
              src={
                company.logo
                  ? `http://localhost:5000${company.logo}`
                  : "https://via.placeholder.com/80"
              }
              alt={company.name}
              style={styles.logo}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/80";
              }}
            />

            <h3>{company.name}</h3>

            <p>{company.jobs} Open Position{company.jobs > 1 ? "s" : ""}</p>
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

  title: {
    fontSize: "36px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#64748b",
    marginBottom: "50px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
    transition: ".3s",
    cursor: "pointer",
  },

  logo: {
    width: "70px",
    height: "70px",
    borderRadius: "12px",
    objectFit: "cover",
    marginBottom: "15px",
  },
};

export default TopCompanies;