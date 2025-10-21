import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-md shadow-md"
          : "bg-black/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 text-white font-bold text-xl">
            <Link to="/">Logo</Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 text-white font-medium">
            <Link to="/upcomings" className="hover:text-gray-300">
              Upcomings
            </Link>
            <Link to="/blog" className="hover:text-gray-300">
              Blog
            </Link>
          </nav>

          {/* Sign In */}
          <div className="hidden md:flex">
            <Link
              to="/signin"
              className="text-white font-medium border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Placeholder */}
          <div className="md:hidden text-white">Menu</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
