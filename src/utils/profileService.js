import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getProfile = async () => {
  const res = await API.get("/user/profile");
  return res.data;
};

export const updateProfile = async (name) => {
  const res = await API.put("/user/profile", {
    name,
  });

  return res.data;
};

export const changePassword = async (
  oldPassword,
  newPassword
) => {
  const res = await API.put("/user/change-password", {
    oldPassword,
    newPassword,
  });

  return res.data;
};