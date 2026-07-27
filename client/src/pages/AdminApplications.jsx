import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  getAllApplications,
  updateApplicationStatus,
} from "../services/applicationService";
import { toast } from "react-toastify";

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, search, statusFilter]);

  const fetchApplications = async () => {
    try {
      const data = await getAllApplications();
      setApplications(data.applications);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load applications"
      );
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let data = [...applications];

    if (search) {
      data = data.filter(
        (app) =>
          app.applicant?.name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          app.applicant?.email
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          app.job?.company
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          app.job?.position
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      data = data.filter(
        (app) => app.status === statusFilter
      );
    }

    setFilteredApplications(data);
  };

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      await updateApplicationStatus(id, status);

      toast.success("Application status updated");

      fetchApplications();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update status"
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "#2563eb";

      case "Under Review":
        return "#f59e0b";

      case "Shortlisted":
        return "#0ea5e9";

      case "Interview":
        return "#8b5cf6";

      case "Rejected":
        return "#ef4444";

      case "Hired":
        return "#16a34a";

      default:
        return "#64748b";
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#f8fafc",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              marginBottom: "5px",
            }}
          >
            Manage Applications
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "25px",
            }}
          >
            Total Applications:{" "}
            <strong>
              {filteredApplications.length}
            </strong>
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginBottom: "25px",
            }}
          >
            <input
              type="text"
              placeholder="Search applicant, company or job..."
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
              style={styles.input}
            >
              <option>All</option>
              <option>Applied</option>
              <option>Under Review</option>
              <option>Shortlisted</option>
              <option>Interview</option>
              <option>Rejected</option>
              <option>Hired</option>
            </select>
          </div>

          {loading ? (
            <p>Loading applications...</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>
                      Applicant
                    </th>

                    <th style={styles.th}>
                      Position
                    </th>

                    <th style={styles.th}>
                      Company
                    </th>

                    <th style={styles.th}>
                      Status
                    </th>

                    <th style={styles.th}>
                      Resume
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.length ===
                  0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          textAlign: "center",
                          padding: "35px",
                        }}
                      >
                        No applications found.
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map(
                      (application) => (
                        <tr
                          key={application._id}
                        >
                          <td style={styles.td}>
                            <div
                              style={{
                                fontWeight: "600",
                              }}
                            >
                              {
                                application
                                  .applicant
                                  ?.name
                              }
                            </div>

                            <div
                              style={{
                                fontSize: "13px",
                                color: "#64748b",
                              }}
                            >
                              {
                                application
                                  .applicant
                                  ?.email
                              }
                            </div>
                          </td>

                          <td style={styles.td}>
                            {
                              application.job
                                ?.position
                            }
                          </td>

                          <td style={styles.td}>
                            {
                              application.job
                                ?.company
                            }
                          </td>

                          <td style={styles.td}>
                            <select
                              value={
                                application.status
                              }
                              onChange={(e) =>
                                handleStatusChange(
                                  application._id,
                                  e.target
                                    .value
                                )
                              }
                              style={{
                                ...styles.select,
                                background:
                                  getStatusColor(
                                    application.status
                                  ),
                                color: "#fff",
                              }}
                            >
                              <option>
                                Applied
                              </option>

                              <option>
                                Under Review
                              </option>

                              <option>
                                Shortlisted
                              </option>

                              <option>
                                Interview
                              </option>

                              <option>
                                Rejected
                              </option>

                              <option>
                                Hired
                              </option>
                            </select>
                          </td>

                          <td style={styles.td}>
                            {application
                              .applicant
                              ?.resume ? (
                              <a
                                href={`http://localhost:5000${application.applicant.resume}`}
                                target="_blank"
                                rel="noreferrer"
                                style={
                                  styles.resumeButton
                                }
                              >
                                View Resume
                              </a>
                            ) : (
                              "No Resume"
                            )}
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    minWidth: "250px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
  },

  th: {
    background: "#2563eb",
    color: "#fff",
    padding: "15px",
    textAlign: "left",
  },

  td: {
    padding: "15px",
    borderBottom: "1px solid #eee",
  },

  select: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  resumeButton: {
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    display: "inline-block",
    fontSize: "14px",
  },
};

export default AdminApplications;