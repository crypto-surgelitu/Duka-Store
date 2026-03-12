/**
 * @file services/api.js
 * Central Axios instance for API calls (MVC - Service/Controller layer).
 */
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("duka_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
