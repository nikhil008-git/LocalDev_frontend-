import React from "react";
import { Link } from "react-router-dom";
import { FaDiscord, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-6 px-4 flex flex-col items-center space-y-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-start w-full max-w-6xl space-y-6 md:space-y-0">
        
        {/* Left Column */}
        <div className="flex flex-col space-y-1">
          <h2 className="text-white font-semibold text-lg">Join LocalDev</h2>
          <a href="https://discord.gg/gcgWTZNJQY" target="_blank" rel="noreferrer" className="flex items-center space-x-2 hover:text-white">
            <FaDiscord /> <span>Discord</span>
          </a>
          <a href="https://x.com/LocalDev_" target="_blank" rel="noreferrer" className="flex items-center space-x-2 hover:text-white">
            <FaTwitter /> <span>Twitter / X</span>
          </a>
          <a href="https://chat.whatsapp.com/EKluGB75nxjBoCRQCPYyD9?mode=wwt" target="_blank" rel="noreferrer" className="flex items-center space-x-2 hover:text-white">
            <FaWhatsapp /> <span>WhatsApp</span>
          </a>
          <a href="https://www.linkedin.com/company/localdev-in/" target="_blank" rel="noreferrer" className="flex items-center space-x-2 hover:text-white">
            <FaLinkedin /> <span>LinkedIn</span>
          </a>
        </div>

        {/* Middle Column (stacked links vertically) */}
        <div className="flex flex-col space-y-2 text-gray-400 uppercase text-sm font-medium text-center tracking-wider">
          <Link to="/upcomings" className="hover:text-white">Upcomings</Link>
          <Link to="/newsletter" className="hover:text-white">Newsletter</Link>
        </div>

        {/* Right Column (Top Right & Credit below) */}
        <div className="flex flex-col items-end space-y-2 text-sm text-gray-400">
          <div>© 2025 LocalDevOrg</div>
          <div>
           Not just another template — built by{" "}
            <a
              href="https://www.linkedin.com/in/nikhil-rajpurohit-05b39734a/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline"
            >
              Nikhil Rajpurohit
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray/20 w-full max-w-6xl"></div>
    </footer>
  );
};

export default Footer;
