/**
 * @file services/authService.js
 * Authentication API calls.
 */
import api from "./api";

export const authService = {
    login: (credentials) => api.post("/auth/login", credentials),
    register: (data) => api.post("/auth/register", data),
    logout: () => {
        localStorage.removeItem("duka_token");
        localStorage.removeItem("duka_user");
    },
    getProfile: () => api.get("/auth/profile"),
};
