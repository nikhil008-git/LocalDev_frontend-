import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Header = () => {
  const { logout } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16 gap-4">
          <Link 
            to="/" 
            className="text-black hover:text-gray-600 transition uppercase text-xs"
          >
            Home
          </Link>
          <button
            onClick={logout}
            className="text-black font-medium bg-gray-300 px-4 py-1.5 rounded-full hover:bg-white transition text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;