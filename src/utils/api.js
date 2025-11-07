import axios from "axios";

// Set the base URL for the API
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://tripify-backend-wjx9.onrender.com"
    : "http://localhost:7000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
