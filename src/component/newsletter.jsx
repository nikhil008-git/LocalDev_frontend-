// Component/newsletter.js
import React from "react";

const Component = ({ date, tag, tagColor, title }) => {
  return (
    <div className="flex flex-col sm:flex-row w-full max-w-4xl mb-8 mt-20 border-b border-gray-200">
      
      {/* Left side - Date */}
      <div className="w-full sm:w-1/4 text-left sm:text-right pr-0 sm:pr-6 flex-shrink-0 flex items-start mb-2 sm:mb-0">
        <p className="text-gray-400 text-xs sm:text-sm mt-0 sm:mt-2">{date}</p>
      </div>

      {/* Right side - Content Box */}
      <div className="w-full sm:w-3/4 rounded-lg p-3 sm:p-4 flex flex-col">
        {tag && (
          <div className="flex items-center mb-1 sm:mb-2">
            <span
              className={`inline-block text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded ${tagColor} mb-1 sm:mb-2`}
            >
              {tag}
            </span>
          </div>
        )}
        <h2
          className="text-base sm:text-lg md:text-xl font-semibold"
          style={{
            fontFamily: '"Untitled Sans", sans-serif',
            fontWeight: 100,
            lineHeight: "1.4",
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Component;
