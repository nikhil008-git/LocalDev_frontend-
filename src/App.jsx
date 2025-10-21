import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./pages/Home";
import Header from "./component/Header";
import AndroidBeta from "./pages/AndroidBeta";
import Apora from "./pages/Apora";
import IOSBeta from "./pages/IOSbeta";
import Perplexiy from "./pages/Perplexity";
import SummaryPage from "./pages/Summary";
import Footer from "./component/Footer";
import Blog from "./pages/Blog";
import Upcoming from "./pages/Upcoming";
import TestFlight from "./pages/TestFlight";

export default function App() {
 
    return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testflight" element={<TestFlight />} />
        < Route path = "/blog" ekement={<Blog />} />
      <Route path = "/upcomings" ekement={<Upcoming />} />  
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/android" element={<AndroidBeta />} />
        <Route path="/apora" element={<Apora />} />
        <Route path="/ios" element={<IOSBeta />} />
        <Route path="/perplexiy" element={<Perplexiy />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
      <Footer />
    </>
  );
}
  