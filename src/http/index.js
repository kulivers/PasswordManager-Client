import axios from "axios";

const url = "https://localhost:5001/api";

const api = axios.create({
  withCredentials: true,
  baseURL: url,
});

api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    "access-token"
  )}`;
  return config;
});

export default api;
