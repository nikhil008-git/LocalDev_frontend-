/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Create context
export const AuthContext = createContext();

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use environment variable with fallback
  const ENDPOINT = import.meta.env.VITE_API_ENDPOINT || "https://localdev-backend-1.onrender.com/v1/api";

  // Fetch user info from backend using token
  const fetchUser = useCallback(async (authToken) => {
    try {
      const res = await axios.get(`${ENDPOINT}/profile`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUser(res.data.user);
      return true;
    } catch (err) {
      console.error("Fetch user error:", err.response?.data || err.message);
      // Clear invalid token
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      return false;
    } finally {
      setLoading(false);
    }
  }, [ENDPOINT]);

  // Load token from localStorage on app start
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchUser(savedToken);
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  // SIGNUP: only creates user (no token returned)
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(`${ENDPOINT}/signup`, {
        name,
        email,
        password,
      });
      return { success: true, message: res.data.message };
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    }
  };

  // LOGIN: returns only token
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${ENDPOINT}/signin`, { email, password });
      const authToken = res.data.token;

      setToken(authToken);
      localStorage.setItem("token", authToken);

      // Fetch user after getting token
      const success = await fetchUser(authToken);

      if (success) {
        return { success: true, message: "Login successful" };
      } else {
        return { success: false, message: "Failed to fetch user data" };
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // LOGOUT: clears local storage + state
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};