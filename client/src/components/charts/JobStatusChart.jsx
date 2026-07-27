import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function JobStatusChart({ stats }) {
  const data = {
    labels: [
      "Available",
      "Coming Soon",
      "Closed",
    ],

    datasets: [
      {
        data: [
          stats.availableJobs,
          stats.comingSoonJobs,
          stats.closedJobs,
        ],

        backgroundColor: [
          "#20c997",
          "#ffc107",
          "#dc3545",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 3px 10px rgba(0,0,0,.08)",
      }}
    >
      <h3>Job Status</h3>

      <Pie data={data} />
    </div>
  );
}

export default JobStatusChart;