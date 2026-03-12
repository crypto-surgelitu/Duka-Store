/**
 * @file controllers/AuthController.js
 * Handles auth state logic for the UI (MVC - Controller layer).
 */
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("duka_user");
        return stored ? JSON.parse(stored) : null;
    });
    const [loading, setLoading] = useState(false);

    const login = async (email, password, role) => {
        setLoading(true);
        try {
            const response = await authService.login({ email, password });
            if (response.data.token) {
                localStorage.setItem("duka_user", JSON.stringify(response.data.user));
                localStorage.setItem("duka_token", response.data.token);
                setUser(response.data.user);
                return { success: true, user: response.data.user };
            }
            return { success: false, error: response.data.message || "Login failed" };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || "Login failed" };
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password, phone, role) => {
        setLoading(true);
        try {
            const response = await authService.register({ name, email, password, phone, role });
            if (response.data.userId) {
                return { success: true, userId: response.data.userId };
            }
            return { success: false, error: response.data.message || "Registration failed" };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || "Registration failed" };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
