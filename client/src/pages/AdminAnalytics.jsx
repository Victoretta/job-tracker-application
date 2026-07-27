import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { getAdminAnalytics } from "../services/adminService";

import {
  FaUsers,
  FaBriefcase,
  FaClipboardList,
} from "react-icons/fa";

import ApplicationChart from "../components/charts/ApplicationChart";
import JobStatusChart from "../components/charts/JobStatusChart";

function AdminAnalytics() {
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,

    applied: 0,
    underReview: 0,
    shortlisted: 0,
    interview: 0,
    hired: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await getAdminAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            padding: "35px",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "5px",
            }}
          >
            System Analytics
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "30px",
            }}
          >
            Overview of users, jobs and application activity.
          </p>

          {loading ? (
            <h3>Loading analytics...</h3>
          ) : (
            <>
              {/* Dashboard Cards */}

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                  marginBottom: "35px",
                }}
              >
                <DashboardCard
                  title="Total Users"
                  value={analytics.totalUsers}
                  color="#2563eb"
                  icon={<FaUsers />}
                />

                <DashboardCard
                  title="Total Jobs"
                  value={analytics.totalJobs}
                  color="#16a34a"
                  icon={<FaBriefcase />}
                />

                <DashboardCard
                  title="Applications"
                  value={analytics.totalApplications}
                  color="#ea580c"
                  icon={<FaClipboardList />}
                />
              </div>

              {/* Charts */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "2fr 1fr",
                  gap: "25px",
                }}
              >
                <ApplicationChart
                  monthlyJobs={[
                    analytics.applied,
                    analytics.underReview,
                    analytics.shortlisted,
                    analytics.interview,
                    analytics.hired,
                    analytics.rejected,
                  ]}
                />

                <JobStatusChart
                stats={{
                    availableJobs: analytics.availableJobs,
                    comingSoonJobs: analytics.comingSoonJobs,
                    closedJobs: analytics.closedJobs,
                }}
                />
              </div>

              {/* Summary */}

              <div
                style={{
                  marginTop: "40px",
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "25px",
                  boxShadow:
                    "0 5px 15px rgba(0,0,0,.08)",
                }}
              >
                <h3
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  Application Status Summary
                </h3>

                <table
                  style={{
                    width: "100%",
                    borderCollapse:
                      "collapse",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={styles.header}>
                        Status
                      </th>

                      <th style={styles.header}>
                        Count
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td style={styles.cell}>
                        Applied
                      </td>
                      <td style={styles.cell}>
                        {analytics.applied}
                      </td>
                    </tr>

                    <tr>
                      <td style={styles.cell}>
                        Under Review
                      </td>
                      <td style={styles.cell}>
                        {
                          analytics.underReview
                        }
                      </td>
                    </tr>

                    <tr>
                      <td style={styles.cell}>
                        Shortlisted
                      </td>
                      <td style={styles.cell}>
                        {
                          analytics.shortlisted
                        }
                      </td>
                    </tr>

                    <tr>
                      <td style={styles.cell}>
                        Interview
                      </td>
                      <td style={styles.cell}>
                        {
                          analytics.interview
                        }
                      </td>
                    </tr>

                    <tr>
                      <td style={styles.cell}>
                        Hired
                      </td>
                      <td style={styles.cell}>
                        {analytics.hired}
                      </td>
                    </tr>

                    <tr>
                      <td style={styles.cell}>
                        Rejected
                      </td>
                      <td style={styles.cell}>
                        {
                          analytics.rejected
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  header: {
    background: "#2563eb",
    color: "#fff",
    padding: "14px",
    textAlign: "left",
  },

  cell: {
    padding: "14px",
    borderBottom: "1px solid #e5e7eb",
  },
};

export default AdminAnalytics;