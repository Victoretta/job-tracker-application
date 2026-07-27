import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";


// REGISTER
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};


// LOGIN
export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};


// GET CURRENT USER
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/me`,
    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// UPDATE PROFILE
export const updateProfile = async (profileData) => {

  const token = localStorage.getItem("token");


  const response = await axios.put(
    `${API_URL}/profile`,
    profileData,
    {
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json",
      },
    }
  );


  return response.data;

};



// UPLOAD PROFILE IMAGE
export const uploadProfileImage = async (file) => {

  const token = localStorage.getItem("token");


  const formData = new FormData();

  formData.append(
    "profileImage",
    file
  );


  const response = await axios.post(
    `${API_URL}/upload-profile-image`,
    formData,
    {
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"multipart/form-data",
      },
    }
  );


  return response.data;

};



// UPLOAD RESUME
export const uploadResume = async (file) => {

  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("resume", file);


  const response = await axios.post(
    `${API_URL}/upload-resume`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );


  return response.data;
};

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API_URL}/forgot-password`,
    { email }
  );

  return response.data;
};


// RESET PASSWORD
export const resetPassword = async (token, password) => {
  const response = await axios.post(
    `${API_URL}/reset-password/${token}`,
    {
      password,
    }
  );

  return response.data;
};