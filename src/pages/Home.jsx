import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import mac_bg from '../assets/mac/mac_bg.avif';
import api from '../assets/api/api.png';
import { features, localDevFeatures } from '../util/constant';

const Home = () => {
  const videoRef = useRef(null);
  const macContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [videoPosition, setVideoPosition] = useState({ x: '25%', y: '25%' }); // Centered on mac screen
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const video = videoRef.current;
    const macContainer = macContainerRef.current;
    if (!video || !macContainer) return;

    const handleMouseDown = (e) => {
      e.preventDefault();
      setIsDragging(true);
      const rect = video.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseMove = (e) => {
      if (isDragging && video && macContainer) {
        const macRect = macContainer.getBoundingClientRect();
        const videoWidth = video.offsetWidth;
        const videoHeight = video.offsetHeight;
        
        // Calculate new position relative to mac container
        let newX = e.clientX - macRect.left - dragOffset.x;
        let newY = e.clientY - macRect.top - dragOffset.y;

        // Keep video within mac container bounds
        newX = Math.max(0, Math.min(newX, macRect.width - videoWidth));
        newY = Math.max(0, Math.min(newY, macRect.height - videoHeight));

        setVideoPosition({ x: `${newX}px`, y: `${newY}px` });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    video.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      video.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);
 
  return (
    <>
    
      <div className="mt-24 px-20 flex flex-col items-center">
        {/* Top large headings */}
        <div className="text-white text-6xl font-extrabold text-center leading-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
          From Local Machines
        </div>
        <div className="text-white text-6xl font-extrabold text-center mt-2 leading-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
          to Global Teams
        </div>

        {/* Tagline below */}
        <div className="mt-8">
          <div className="text-gray-400 uppercase text-sm font-medium text-center">
            From Idea to Code, Together
          </div>
        </div>
      </div>

{/* Mac background with video on screen */}
<div className="relative w-screen h-screen overflow-hidden bg-black">
  {/* Mac container with video */}
  <div
    ref={macContainerRef}
    className="relative px-60 max-xl:px-32 max-lg:px-16 max-md:px-4"
  >
    <img
      src={mac_bg}
      alt="mac_bg"
      className="w-full h-auto mt-20 rounded-lg"
    />

    {/* Responsive video on screen */}
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      className="absolute rounded-xl shadow-lg select-none
                 md:w-[50%] md:h-[62%] sm:w-[70%] sm:h-[50%] w-[85%] h-[45%]"
      style={{
        left: videoPosition.x,
        top: videoPosition.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        objectFit: 'cover',
      }}
    >
      <source src="/Software_video/Software_launch.mp4" type="video/mp4" />
    </video>
  </div>
</div>



      <div className="text-center leading-tight mt-20 transition-colors duration-300 cursor-pointer" style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
        <span className="text-white text-3xl font-extrabold">Screenshare done right—</span>
        <span className="text-gray-400 hover:text-white text-3xl font-extrabold">and everything else too.</span>
      </div>

      <div className="mt-16 max-w-5xl mx-auto">
        {/* Top 3 features */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {features.slice(0, 3).map((feature) => (
            <div key={feature.id} className="text-left">
              <h3
                className="text-white text-xl font-bold mb-2"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {feature.title}
              </h3>
              <p
                className="uppercase text-gray-400 text-sm font-medium text-left"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom 3 features */}
        <div className="grid grid-cols-3 gap-6">
          {features.slice(3, 6).map((feature) => (
            <div key={feature.id} className="text-left">
              <h3
                className="text-white text-xl font-bold mb-2"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {feature.title}
              </h3>
              <p
                className="uppercase text-gray-400 text-sm font-medium text-left"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-60">
        <div className="text-white text-3xl font-bold text-center leading-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
          powered by THE API COMMUNITY
        </div>
        
        {/* Logo */}
        <div className="mt-8">
          <img src={api} alt="API Community Logo" className="h-16 w-auto" />
        </div>
      </div>
    
      <div className="flex flex-col items-center mt-[200px]">
        <div className="text-white text-3xl font-bold text-center leading-tight">
          Where screens meet minds
        </div>

        <div className="text-gray-400 uppercase text-sm font-medium text-center mt-3 px-4">
          join, code together, share, and create magic in every line.
        </div>
      </div>

      <div className="bg-white py-12 sm:py-16 lg:py-24 mt-12 sm:mt-16 lg:mt-24">
        <div className="px-4 sm:px-8 lg:px-20">
          {/* Local Dev Features Section */}
          <div className="max-w-5xl mx-auto">
            {/* First row - responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 mb-6 sm:mb-8">
              {localDevFeatures.slice(0, 4).map((feature) => (
                <div key={feature.id} className="text-left">
                  <h3 
                    className="text-black text-lg sm:text-xl font-bold mb-2" 
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="uppercase text-gray-400 text-xs sm:text-sm font-medium text-left" 
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Second row - responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6">
              {localDevFeatures.slice(4, 7).map((feature) => (
                <div key={feature.id} className="text-left">
                  <h3 
                    className="text-black text-lg sm:text-xl font-bold mb-2" 
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="uppercase text-gray-400 text-xs sm:text-sm font-medium text-left" 
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-12">
          <Link 
            to="/iosbeta" 
            className="w-2/5 py-4 flex justify-between items-center border-b border-black/20 hover:bg-gray-100/50 transition-colors duration-200"
          >
            <span className="uppercase text-black text-sm font-medium">IOS Beta</span>
            <span className="text-sm font-normal text-gray-400" style={{fontFamily: 'GT Pressura Mono, monospace'}}>SOON</span>
          </Link>
          <Link 
            to="/room" 
            className="w-2/5 py-4 flex justify-between items-center border-b border-black/20 hover:bg-gray-100/50 transition-colors duration-200"
          >
            <span className="uppercase text-black text-sm font-medium">Room</span>
            <span className="text-sm font-normal text-gray-400" style={{fontFamily: 'GT Pressura Mono, monospace'}}>SOON</span>
          </Link>
          <Link 
            to="/newsletter" 
            className="w-2/5 py-4 flex justify-between items-center border-b border-black/20 hover:bg-gray-100/50 transition-colors duration-200"
          >
            <span className="uppercase text-black text-sm font-medium">NewsLetter</span>
            <span className="text-sm font-normal text-gray-400" style={{fontFamily: 'GT Pressura Mono, monospace'}}>SOON</span>
          </Link>
          <a 
            href="https://www.raycast.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-2/5 py-4 flex justify-between items-center border-b border-black/20 hover:bg-gray-100/50 transition-colors duration-200"
          >
            <span className="uppercase text-black text-sm font-medium">Raycast</span>
            <span className="text-sm font-normal text-gray-400" style={{fontFamily: 'GT Pressura Mono, monospace'}}>SOON</span>
          </a>
          <a 
            href="https://testflight.apple.com/join/LnpuuI7d" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-2/5 py-4 flex justify-between items-center border-b border-black/20 hover:bg-gray-100/50 transition-colors duration-200"
          >
            <span className="uppercase text-black text-sm font-medium">TestFlight</span>
            <span className="text-sm font-normal text-gray-400" style={{fontFamily: 'GT Pressura Mono, monospace'}}>SOON</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;