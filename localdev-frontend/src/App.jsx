import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";

// Pages
import Home from "./pages/Home";
import NewsLetter from "./pages/Newsletter";
import Upcoming from "./pages/Upcoming";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";


export default function App() {
  const { isAuthenticated, fetchProfile } = useAuthStore();

  // Fetch profile if token exists
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <>
     

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/newsletter" element={<NewsLetter />} />
        <Route path="/upcomings" element={<Upcoming />} />
        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboard - only accessible if logged in */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/home" />}
        />
      </Routes>

     
    </>
  );
}
