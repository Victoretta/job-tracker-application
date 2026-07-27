function RecentActivity({ jobs }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <h3>Recent Jobs</h3>

      {jobs.slice(0, 5).map((job) => (
        <div
          key={job._id}
          style={{
            padding: "12px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <strong>{job.position}</strong>

          <br />

          <span>{job.company}</span>

          <br />

          <small>{job.status}</small>
        </div>
      ))}
    </div>
  );
}

export default RecentActivity;