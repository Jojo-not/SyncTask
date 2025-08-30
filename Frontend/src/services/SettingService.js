import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getSettings = async () => {
  try {
    const response = await api.get("/settings");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch settings"
    );
  }
};
export const updateEmail = async (emailData) => {
  try {
    const response = await api.post("/settings/email", emailData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update email");
  }
};

export const updatePassword = async (passwordData) => {
  try {
    const response = await api.post("/settings/password", passwordData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update password"
    );
  }
};
export const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};
