import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import JobTable from "../components/JobTable";
import { toast } from "react-toastify";
import JobForm from "../components/JobForm";
import ProfileCard from "../components/ProfileCard";
// import Sidebar from "../components/Sidebar";
import JobStatusChart from "../components/charts/JobStatusChart";
import ApplicationChart from "../components/charts/ApplicationChart";
import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/Sidebar";
import RecentActivity from "../components/RecentActivity";
import QuickActions from "../components/QuickActions";

import {
    FaBriefcase,
    FaUsers,
    FaCheckCircle,
    FaTimesCircle,
    FaClock
} from "react-icons/fa";


import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getDashboardStats,
  getAnalytics,
} from "../services/jobService";

function AdminDashboard() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
const jobsPerPage = 1;

  const [formData, setFormData] = useState({
    company: "",
    companyLogo: "",
    position: "",
    description: "",
    skills: "",
    experience: "",
    salaryMin: "",
    salaryMax: "",
    location: "",
    employmentType: "Full-Time",
    openings: 1,
    applicationDeadline: "",
    status: "Available",
  });
  const [editingJobId, setEditingJobId] = useState(null);

  const [stats, setStats] = useState({
  totalJobs: 0,
  availableJobs: 0,
  closedJobs: 0,
  totalApplications: 0,
});

const [analytics, setAnalytics] = useState({
  monthlyJobs: Array(12).fill(0),
  availableJobs: 0,
  comingSoonJobs: 0,
  closedJobs: 0,
});

  useEffect(() => {
  fetchJobs();
  fetchStats();
  fetchAnalytics();
}, []);

const fetchAnalytics = async () => {
  try {
    const data = await getAnalytics();
    setAnalytics(data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  setCurrentPage(1);
}, [search, statusFilter, sortBy]);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchStats = async () => {
  try {
    const data = await getDashboardStats();
    setStats(data);
  } catch (error) {
    
    console.log(error);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (job) => {
  setEditingJobId(job._id);

  setFormData({
    company: job.company || "",
    companyLogo: job.companyLogo || "",
    position: job.position || "",
    description: job.description || "",
    skills: job.skills ? job.skills.join(", ") : "",
    experience: job.experience || "",
    salaryMin: job.salary?.min || "",
    salaryMax: job.salary?.max || "",
    location: job.location || "",
    employmentType: job.employmentType || "Full-Time",
    openings: job.openings || 1,
    applicationDeadline: job.applicationDeadline
      ? job.applicationDeadline.substring(0, 10)
      : "",
    status: job.status || "Available",
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (Number(formData.salaryMin) > Number(formData.salaryMax)) {
        toast.error(
          "Maximum salary must be greater than minimum salary."
        );
  return;
}
// if (
//   new Date(formData.applicationDeadline) < new Date()
// ) {
//   toast.error(
//     "Application deadline cannot be in the past."
//   );
//   return;
// }
const today = new Date();
today.setHours(0, 0, 0, 0);

const deadline = new Date(formData.applicationDeadline);

if (deadline < today) {
  toast.error("Application deadline cannot be in the past.");
  return;
}
if (Number(formData.openings) < 1) {
  toast.error(
    "There must be at least one opening."
  );
  return;
}
if (
  !formData.company ||
  !formData.position ||
  !formData.description
) {
  toast.error(
    "Please fill in all required fields."
  );
  return;
}
setLoading(true);
      const jobData = {
        company: formData.company,
        companyLogo: formData.companyLogo,
        position: formData.position,
        description: formData.description,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim()),

        experience: formData.experience,

        salary: {
          min: Number(formData.salaryMin),
          max: Number(formData.salaryMax),
          currency: "INR",
          period: "Year",
        },

        location: formData.location,
        employmentType: formData.employmentType,
        openings: Number(formData.openings),
        applicationDeadline: formData.applicationDeadline,
        status: formData.status,
      };

      if (editingJobId) {
  await updateJob(editingJobId, jobData);

    toast.success("Job updated successfully!");
  } else {
    await createJob(jobData);

    toast.success("Job created successfully!");
  }

      setFormData({
        company: "",
        companyLogo: "",
        position: "",
        description: "",
        skills: "",
        experience: "",
        salaryMin: "",
        salaryMax: "",
        location: "",
        employmentType: "Full-Time",
        openings: 1,
        applicationDeadline: "",
        status: "Available",
      });
      setEditingJobId(null);

      setLoading(false);
      fetchJobs();
      fetchStats();
    } catch (error) {
      setLoading(false);
  console.log(error);

  console.log(error.response);

  toast.error(
   "Failed to create jod"
);
}
  };
 const filteredJobs = jobs
  .filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.position.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      job.status === statusFilter;

    return matchesSearch && matchesStatus;
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);

      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);

      case "companyAsc":
        return a.company.localeCompare(b.company);

      case "companyDesc":
        return b.company.localeCompare(a.company);

      default:
        return 0;
    }
  });

  const indexOfLastJob = currentPage * jobsPerPage;
const indexOfFirstJob = indexOfLastJob - jobsPerPage;

const currentJobs = filteredJobs.slice(
  indexOfFirstJob,
  indexOfLastJob
);

const totalPages = Math.ceil(
  filteredJobs.length / jobsPerPage
);

  return (
    <>
    {/* <DashboardLayout
    sidebar={<Sidebar />}
  > */}
  <Navbar />

  <div
    style={{
      display: "flex",
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

       <div style={{ margin: "40px 0" }} />

        <h2>Dashboard Statistics</h2>

<div
  style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  }}
>
  <DashboardCard
    title="Total Jobs"
    value={stats.totalJobs}
    color="#0d6efd"
    icon={<FaBriefcase />}
  />

  <DashboardCard
    title="Applications"
    value={stats.totalApplications}
    color="#198754"
    icon={<FaUsers />}
  />

  <DashboardCard
    title="Available"
    value={stats.availableJobs}
    color="#20c997"
    icon={<FaCheckCircle />}
  />

  <DashboardCard
    title="Coming Soon"
    value={stats.comingSoonJobs}
    color="#ffc107"
    icon={<FaClock />}
  />

  <DashboardCard
    title="Closed"
    value={stats.closedJobs}
    color="#dc3545"
    icon={<FaTimesCircle />}
  />
</div>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "25px",
    marginTop: "35px",
    marginBottom: "35px",
  }}
>
  <ApplicationChart
  monthlyJobs={analytics.monthlyJobs}
/>

  <JobStatusChart stats={stats} />
</div>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "25px",
    marginTop: "30px",
  }}
>
  <RecentActivity jobs={jobs} />

  <QuickActions />
</div>





  
  
  
  
</div>

      </div>
       {/* </DashboardLayout> */}
    </>
    
  );
}

export default AdminDashboard;