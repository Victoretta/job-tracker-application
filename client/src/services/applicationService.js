import axios from "axios";

const API_URL = "http://localhost:5000/api/applications";

const getToken = () => localStorage.getItem("token");

// Apply for a job
export const applyForJob = async (jobId) => {
  const response = await axios.post(
    `${API_URL}/${jobId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// User's applications
export const getMyApplications = async () => {
  const response = await axios.get(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Admin: Get applications for a job
export const getApplicationsForJob = async (jobId) => {
  const response = await axios.get(`${API_URL}/job/${jobId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Admin: Update application status
export const updateApplicationStatus = async (applicationId, status) => {
  const response = await axios.put(
    `${API_URL}/${applicationId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};
export const checkApplication = async (jobId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/check/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getApplicantDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:5000/api/applications/dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
// Admin: Get all applications
export const getAllApplications = async () => {
  const response = await axios.get(
    `${API_URL}/all`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};