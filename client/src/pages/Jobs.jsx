import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import JobTable from "../components/JobTable";
import { getJobs, deleteJob } from "../services/jobService";
import { toast } from "react-toastify";

function Jobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);

const jobsPerPage = 2;
useEffect(() => {
  setCurrentPage(1);
}, [search, statusFilter, sortBy]);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data.jobs || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await deleteJob(id);
      toast.success("Job deleted successfully!");
      fetchJobs();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.company
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        job.position
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        job.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "Newest") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );
    });

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

const indexOfLastJob = currentPage * jobsPerPage;
const indexOfFirstJob = indexOfLastJob - jobsPerPage;

const currentJobs = filteredJobs.slice(
  indexOfFirstJob,
  indexOfLastJob
);

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={styles.container}>
          {/* Header */}

          <div style={styles.header}>
            <div>
              <h1 style={{ margin: 0 }}>
                Jobs Management
              </h1>

              <p style={styles.subtitle}>
                Manage all job postings from one place.
              </p>
            </div>

            <button
              style={styles.createBtn}
              onClick={() =>
                navigate("/admin/jobs/create")
              }
            >
              + Create Job
            </button>
          </div>

          {/* Search & Filters */}

          <div style={styles.filters}>
            <input
              type="text"
              placeholder="🔍 Search company or position..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={styles.input}
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              style={styles.select}
            >
              <option value="All">All Status</option>
              <option value="Available">
                Available
              </option>
              <option value="Coming Soon">
                Coming Soon
              </option>
              <option value="Closed">
                Closed
              </option>
            </select>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              style={styles.select}
            >
              <option value="Newest">
                Newest First
              </option>

              <option value="Oldest">
                Oldest First
              </option>
            </select>
          </div>

          <p style={styles.count}>
            Showing{" "}
            <strong>
              {filteredJobs.length}
            </strong>{" "}
            jobs
          </p>

          <div style={styles.tableCard}>
            <JobTable
            jobs={currentJobs}
              onDelete={handleDelete}
              onEdit={(job) =>
                navigate(
                  `/admin/jobs/edit/${job._id}`
                )
              }
            />
          </div>
          {totalPages > 1 && (
  <div style={styles.pagination}>
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
      style={styles.pageButton}
    >
      Previous
    </button>

    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        style={{
          ...styles.pageButton,
          background:
            currentPage === index + 1
              ? "#2563eb"
              : "#fff",
          color:
            currentPage === index + 1
              ? "#fff"
              : "#333",
        }}
      >
        {index + 1}
      </button>
    ))}

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
      style={styles.pageButton}
    >
      Next
    </button>
  </div>
)}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: "30px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "15px",
  },

  subtitle: {
    color: "#666",
    marginTop: "5px",
  },

  createBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },

  filters: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },

  input: {
    flex: "1",
    minWidth: "260px",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
  },

  select: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    minWidth: "170px",
  },

  count: {
    color: "#666",
    marginBottom: "20px",
  },

  tableCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,.08)",
    overflowX: "auto",
  },
  pagination: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  marginTop: "25px",
  flexWrap: "wrap",
},

pageButton: {
  padding: "10px 16px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#fff",
  fontWeight: "500",
},
};

export default Jobs;