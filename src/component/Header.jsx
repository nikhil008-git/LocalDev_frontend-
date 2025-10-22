import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import local3 from "../assets/localdev/local3.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 ${
        scrolled
          ? "bg-black/70 backdrop-blur-md shadow-md"
          : "bg-black/90"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex text-white font-bold text-xl">
            <Link to="/"><img src={local3} alt="logo" className="w-20 h-15" /></Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-6 text-gray-400" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}>
            <Link to="/upcomings" className="hover:text-white transition uppercase">
              Upcomings
            </Link>
            <Link to="/newsletter" className="hover:text-white transition uppercase">
              NewsLetter
            </Link>
          </nav>

          {/* Sign In - Desktop */}
          <div className="hidden md:flex">
            <Link
              to="/login"
              className="text-white font-medium border border-white/30 px-4 py-1.5 rounded-full hover:bg-gray-800 transition text-sm"
              style={{ fontFamily: 'sans-serif' }}
            >
              Sign In
            </Link>
          </div>

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
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3 text-gray-400" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}>
              <Link 
                to="/upcomings" 
                className="hover:text-white transition uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                Upcomings
              </Link>
              <Link 
                to="/newsletter" 
                className="hover:text-white transition uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                NewsLetter
              </Link>
              <Link
                to="/signin"
                className="text-white font-medium border border-white/30 px-4 py-1.5 rounded-full hover:bg-gray-800 transition text-center w-fit text-sm"
                style={{ fontFamily: 'sans-serif' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;