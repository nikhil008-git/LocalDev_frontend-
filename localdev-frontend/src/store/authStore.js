import { create } from "zustand";
import axios from "axios";

const API_URL = "https://localdev-backend-7.onrender.com/";



const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),


    loginWithGoogle: async (googleUser) => {
    try {
      // Call backend Google login endpoint
      const res = await axios.post(`${API_URL}/api/auth/google`, {
        token: googleUser.credential, // the JWT ID token from frontend
      });

      // Optional: store token if backend returns JWT
      if (res.data.token) localStorage.setItem("token", res.data.token);

      set({
        user: res.data.user,
        token: res.data.token || null,
        isAuthenticated: true,
      });
    } catch (err) {
      console.error("Google login failed:", err);
      throw new Error(err.response?.data?.message || "Google login failed");
    }
  },


  signup: async (data) => {
    try {
      await axios.post(`${API_URL}/v1/api/signup`, data);
    } catch (err) {
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  },

  login: async (data) => {
    try {
      const res = await axios.post(`${API_URL}/v1/api/signin`, data);
      localStorage.setItem("token", res.data.token);
      set({ user: res.data.user, token: res.data.token, isAuthenticated: true });
    } catch (err) {
      throw new Error(err.response?.data?.message || "Invalid credentials");
    }
  },

  fetchProfile: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: res.data.user, isAuthenticated: true });
    } catch (err) {
      console.error("Profile fetch failed:", err);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;