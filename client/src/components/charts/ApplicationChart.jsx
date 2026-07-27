import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function ApplicationChart({ monthlyJobs }) {
  const data = {
    labels: [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
],

    datasets: [
      {
        label: "Applications",

        data: monthlyJobs,

        borderColor: "#0d6efd",

        backgroundColor: "#0d6efd",

        tension: 0.3,
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
      <h3>Applications</h3>

      <Line data={data} />
    </div>
  );
}

export default ApplicationChart;