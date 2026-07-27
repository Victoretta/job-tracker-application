import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicJobs } from "../services/publicJobService";
import JobCard from "./JobCard";

function ClosedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getPublicJobs();

      const closedJobs = (data.jobs || []).filter(
        (job) => job.status === "Closed"
      );

      setJobs(closedJobs.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  };

  if (jobs.length === 0) return null;

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>📁 Recently Closed Jobs</h2>

          <p style={styles.subtitle}>
            Browse recently closed opportunities for reference.
          </p>
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
  section: {
    padding: "80px 40px",
    background: "#f8fafc",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "40px",
  },

  title: {
    fontSize: "36px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#64748b",
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "17px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "25px",
  },
};

export default ClosedJobs;