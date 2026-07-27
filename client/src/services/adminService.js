import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

const getToken = () => localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});


// Analytics

export const getAdminAnalytics = async () => {
  const response = await axios.get(
    `${API_URL}/analytics`,
    config()
  );

  return response.data;
};

// User Management

// Get all users
export const getUsers = async () => {
  const response = await axios.get(
    `${API_URL}/users`,
    config()
  );

  return response.data;
};

// Get one user
export const getUser = async (id) => {
  const response = await axios.get(
    `${API_URL}/users/${id}`,
    config()
  );

  return response.data;
};

// Update user role
export const updateUserRole = async (
  id,
  role
) => {
  const response = await axios.put(
    `${API_URL}/users/${id}/role`,
    { role },
    config()
  );

  return response.data;
};

// Activate / Suspend user
export const updateUserStatus = async (
  id,
  isActive
) => {
  const response = await axios.put(
    `${API_URL}/users/${id}/status`,
    { isActive },
    config()
  );

  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await axios.delete(
    `${API_URL}/users/${id}`,
    config()
  );

  return response.data;
};