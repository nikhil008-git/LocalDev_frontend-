import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./pages/Home";
import Header from "./component/Header";
import AndroidBeta from "./pages/AndroidBeta";
import Apora from "./pages/Apora";
import IOSbeta from "./pages/IOSbeta";
import SummaryPage from "./pages/Summary";
import Footer from "./component/Footer";
import NewsLetter from "./pages/Newsletter";
import Upcoming from "./pages/Upcoming";

export default function App() {
 
    return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        < Route path="/newsletter" element={<NewsLetter />} />
      <Route path = "/upcomings" element={<Upcoming />} />  
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/android" element={<AndroidBeta />} />
        <Route path="/apora" element={<Apora />} />
        <Route path="/ios" element={<IOSbeta />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    
    </>
  );
}
  