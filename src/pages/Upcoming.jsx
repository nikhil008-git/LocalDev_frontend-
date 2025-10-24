import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import doubleclick from "../assets/upcomings/doubleclick.avif";
import ios from "../assets/upcomings/ios.png";
import prototype from "../assets/upcomings/prototype.jpg";
import recording from "../assets/upcomings/recording.avif";
import Remote from "../assets/upcomings/Remote.png";
import summary from "../assets/upcomings/summary.avif";
import meet from "../assets/upcomings/meet.png";
import Header from "../component/Header";


const timelineData = [
  { 
    title: "Double Click to Control", 
    description: "Double click anywhere on shared content to switch from drawing to controlling.",
    image: doubleclick
  },
 
  { 
    title: "Google Calendar Integration", 
    description: "Add a RemotelyOS Session link to any Google Calendar event with a click, or even automatically. To do so, install the RemotelyOS add-on in the Google Workspace Marketplace.",
    image: meet
  },
  { 
    title: "iOS Beta", 
    description: "In addition to pair programming, many will use RemotelyOS for other meetings like standup. When you're on the go, you will also be able join via the iOS app. ",
    image: ios
  },
  { 
    title: "Prototype Phase", 
    description: "Created prototypes and wireframes as an overview for a user experience in using Apora or Zoom instead.",
    image: prototype
  },
  { 
    title: "Recording ", 
    description: "So far, we've been focusing on making RemotelyOS the best tool for doing work together live. However, we'll add features to extend the life of that valuable work beyond the session in LocalDev.",
    image: recording
  },
  { 
    title: "Remote control early access", 
    description: "Sometimes you want to lend a teammate your mouse and keyboard. Be it to set up your development environment, debug a thorny issue, or pair on some code, it’s now one click to grant remote control.",
    image: Remote
  },
  { 
    title: "Better Detail in Summaries, Questions & Drafts", 
    description: " Custom prompting comes in: Just ask for whatever you need.",
    image: summary
  },
];


export default function Upcoming() {
  return (
    <> <Header />
    <div className="relative w-full max-w-6xl mx-auto my-20 px-4 mt-20">
      {/* Desktop Timeline View - Hidden on Mobile */}
      <div className="hidden md:block">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="flex mb-32 relative items-start"
          >
            {/* Vertical dotted line - only show if not the last item */}
            {index < timelineData.length - 1 && (
              <div className="absolute left-52 top-0 h-full border-l-2 border-dotted border-gray-800"></div>
            )}
            
            {/* Sticky animated title on the left */}
            <div className="w-48 sticky top-20 self-start">
              <p className="text-lg font-semibold uppercase text-white">
                {item.title}
              </p>
            </div>

            {/* Spacer for line alignment */}
            <div className="w-20 flex justify-center relative"></div>

            {/* Content on the right */}
            <div className="flex-1 ml-8 max-w-3xl">
              {/* Image */}
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-96 object-cover mb-6 rounded-lg shadow-lg"
              />
              
              {/* Description */}
              <p className="text-gray-400 uppercase text-lg font-medium text-center tracking-wider">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Simple View - Hidden on Desktop */}
      <div className="block md:hidden">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="mb-12"
          >
            {/* Title */}
            <h3 className="text-xl font-semibold uppercase text-white mb-4">
              {item.title}
            </h3>

            {/* Image */}
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-64 object-cover mb-4 rounded-lg shadow-lg"
            />
            
            {/* Description */}
            <p className="text-gray-400 text-sm font-medium tracking-wide">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      
    </div>
    </>
  );
}