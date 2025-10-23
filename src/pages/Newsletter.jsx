// pages/NewsLetter.js
import React from "react";
import Component from "../component/newsletter";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center mt-12 sm:mt-16 px-4">
      
      <Component
        date="Aug 7, 2025"
        tag="BUILDING LOCALDEV"
        tagColor="border border-white-600 text-sm text-white-600"
        title={
          <a
            href="https://localdevs-newsletter.beehiiv.com/p/welcome-to-localdev-circle"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-400"
          >
            Welcome to LocalDev Circle.
          </a>
        }
      />

      <Component
        date="Oct 5, 2025"
        tag="BUILDING LOCALDEV"
        tagColor="border border-blue-600 text-blue-600"
        title={
          <a
            href="https://localdevs-newsletter.beehiiv.com/p/welcome-to-localdev-circle"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-400"
          >
            The Dumb Agent Manifesto
          </a>
        }
      />

      <div className="w-full overflow-x-hidden mt-12">
        <a href="https://localdevs-newsletter.beehiiv.com/p/welcome-to-localdev-circle">
          <div className="flex justify-center items-center px-4">
            <button className="uppercase px-6 sm:px-8 py-1.5 text-gray-200 font-semibold text-xs sm:text-sm rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl">
              Subscribe to the newsletter for more
            </button>
          </div>
        </a>
      </div>

    </div>
  );
};

export default NewsLetter;
