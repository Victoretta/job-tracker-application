import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicJobs } from "../services/publicJobService";
import JobCard from "./JobCard";

function JobSection({
  title,
  subtitle,
  status,
  background = "#f8fafc",
  limit = 4,
}) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, [status]);

  const loadJobs = async () => {
    try {
      const data = await getPublicJobs();

      let filtered = data.jobs || [];

      if (status) {
        filtered = filtered.filter(
          (job) => job.status === status
        );
      }

      setJobs(filtered.slice(0, limit));
    } catch (error) {
      console.error(error);
    }
  };

  if (jobs.length === 0) return null;

  return (
    <section
      style={{
        padding: "80px 40px",
        background,
      }}
    >
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>{title}</h2>

          <p style={styles.subtitle}>{subtitle}</p>
        </div>

        <Link to="/jobs" style={styles.link}>
          View All Jobs →
        </Link>
      </div>

      <div style={styles.grid}>
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
  },

  title: {
    fontSize: "36px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#64748b",
  },

  link: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: "17px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "25px",
  },
};

export default JobSection;