import React from "react";
import Header from "../component/Header";

const newsletterData = [
  {
    date: "Aug 7, 2025",
    tag: "BUILDING LOCALDEV",
    tagColor: "border border-white text-sm text-white",
    title: "Welcome to LocalDev Circle.",
    link: "https://localdevs-newsletter.beehiiv.com/p/welcome-to-localdev-circle"
  },
  {
    date: "Oct 5, 2025",
    tag: "BUILDING LOCALDEV",
    tagColor: "border border-blue-600 text-blue-600",
    title: "The Dumb Agent Manifesto",
    link: "https://localdevs-newsletter.beehiiv.com/p/dumb-agent-manifesto"
  }
];

export default function NewsLetter() {
  return (
    <> 
    <Header />
    <div className="relative w-full max-w-6xl mx-auto my-20 px-4 mt-20">
      {/* Desktop Timeline View - Hidden on Mobile */}
      <div className="hidden md:block">
        {newsletterData.map((item, index) => (
          <div
            key={index}
            className="flex mb-32 relative items-start"
          >
            {/* Vertical dotted line - show for all items */}
            <div className="absolute left-52 top-0 h-full border-l-2 border-dotted border-gray-800"></div>
            
            {/* Sticky date on the left */}
            <div className="w-48 sticky top-20 self-start">
              <p className="text-lg font-semibold uppercase text-white">
                {item.date}
              </p>
            </div>

            {/* Spacer for line alignment */}
            <div className="w-20 flex justify-center relative"></div>

            {/* Content on the right */}
            <div className="flex-1 ml-8 max-w-3xl">
              {/* Tag */}
              <span className={`inline-block px-4 py-1 rounded-full mb-6 ${item.tagColor} text-sm font-medium uppercase tracking-wider`}>
                {item.tag}
              </span>
              
              {/* Title */}
              <h3 className="text-3xl font-bold text-white mb-4 hover:text-gray-400 transition-colors duration-300">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.title}
                </a>
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Simple View - Hidden on Desktop */}
      <div className="block md:hidden">
        {newsletterData.map((item, index) => (
          <div
            key={index}
            className="mb-12"
          >
            {/* Date */}
            <p className="text-sm font-semibold uppercase text-gray-400 mb-2">
              {item.date}
            </p>

            {/* Tag */}
            <span className={`inline-block px-3 py-1 rounded-full mb-3 ${item.tagColor} text-xs font-medium uppercase tracking-wider`}>
              {item.tag}
            </span>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-white hover:text-gray-400 transition-colors duration-300">
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                {item.title}
              </a>
            </h3>
          </div>
        ))}
      </div>

      {/* Subscribe Button */}
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
    </>
  );
}