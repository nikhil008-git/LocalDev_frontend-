/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

// Create context
export const WaitlistContext = createContext();

// Custom hook
export const useWaitlist = () => {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }
  return context;
};

export const WaitlistProvider = ({ children }) => {
  const [waitlistJoined, setWaitlistJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use environment variable with fallback
  const ENDPOINT = import.meta.env.VITE_API_ENDPOINT || "https://localdev-backend-1.onrender.com/v2/api";

  // Function to join the waitlist
  const joinWaitlist = useCallback(async (email) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post("https://localdev-backend-1.onrender.com/v2/api/waitlist/join", { email });

      setWaitlistJoined(true);
      return { success: true, message: res.data.message || "Joined waitlist successfully" };
    } catch (err) {
      console.error("Waitlist join error:", err.response?.data || err.message);

      const message = err.response?.data?.message || "Failed to join waitlist";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, [ENDPOINT]);

  const value = {
    waitlistJoined,
    loading,
    error,
    joinWaitlist,
  };

  return (
    <WaitlistContext.Provider value={value}>
      {children}
    </WaitlistContext.Provider>
  );
};
