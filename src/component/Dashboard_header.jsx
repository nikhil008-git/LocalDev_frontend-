import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import local3 from "../assets/localdev/local3.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {  logout } = useAuth();

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
        scrolled
          ? "bg-black/30 backdrop-blur-lg shadow-lg"
          : "bg-black/20 backdrop-blur-md"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex text-white font-bold text-xl">
            <Link to="/">
              <img src={local3} alt="logo" className="w-20 h-15" />
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-200 hover:text-white transition uppercase"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}
            >
              Home
            </Link>
            <button
              onClick={logout}
              className="text-white font-medium border border-white/40 px-4 py-1.5 rounded-full hover:bg-white/10 transition text-sm"
              style={{ fontFamily: 'sans-serif' }}
            >
              Logout
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 bg-black/40 backdrop-blur-md rounded-lg mt-2 p-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-200 hover:text-white transition uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-white font-medium border border-white/40 px-4 py-1.5 rounded-full hover:bg-white/10 transition text-center w-fit text-sm"
                style={{ fontFamily: 'sans-serif' }}
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;