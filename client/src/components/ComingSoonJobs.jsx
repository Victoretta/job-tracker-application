import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicJobs } from "../services/publicJobService";
import JobCard from "./JobCard";

function ComingSoonJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getPublicJobs();

      const comingSoonJobs = (data.jobs || []).filter(
        (job) => job.status === "Coming Soon"
      );

      setJobs(comingSoonJobs.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  };

  if (jobs.length === 0) return null;

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>🚀 Coming Soon</h2>

          <p style={styles.subtitle}>
            These positions will open soon. Prepare your resume now.
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
    background: "#ffffff",
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

export default ComingSoonJobs;