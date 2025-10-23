import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import mac from '../assets/macaman/mac.png';
import api from '../assets/api/api.png';
import { features, localDevFeatures } from '../util/constant';
import Footer from '../component/Footer';
const Home = () => {
  const videoRef = useRef(null);
  const macContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [videoPosition, setVideoPosition] = useState({ x: '25%', y: '25%' });
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
        
        let newX = e.clientX - macRect.left - dragOffset.x;
        let newY = e.clientY - macRect.top - dragOffset.y;

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
    <div className="w-full overflow-x-hidden mt-15">
      <Link to="/signup">
        <div className="flex justify-center items-center mt-15 sm:mt-12 px-4">
          <button className="uppercase px-6 sm:px-8 py-1.5 text-gray-200 font-semibold text-xs sm:text-sm rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl">
            Go to the Dashboard
          </button>
        </div>
      </Link>

      <div className="mt-8 sm:mt-10 px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col items-center">
        {/* Top large headings */}
        <div className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center leading-tight" style={{ fontFamily: 'Space Grotesk, monospace', letterSpacing: '-0.02em' }}>
          Under LocalDev, we're bringing
        </div>
        <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mt-3 font-medium tracking-wider">
          "remotelyOS"
        </div>

        {/* Tagline below */}
        <div className="mt-6 sm:mt-8">
          <div className="text-gray-400 uppercase text-xs sm:text-sm font-medium text-center tracking-wider">
            The Future of Distributed Development
          </div>
        </div>
      </div>

      {/* Mac background with video on screen */}
      <div className="relative w-full overflow-hidden bg-black py-8 sm:py-12 md:py-16">
        <div
          ref={macContainerRef}
          className="relative px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 max-w-screen-5xl mx-auto"
        >
          <img
            src={mac}
            alt="mac.src"
            className="w-full h-auto rounded-lg"
          />

          {/* Responsive video on screen */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            className="absolute rounded-xl shadow-lg select-none w-[50%] h-[45%] sm:h-[50%] md:h-[58%] lg:h-[62%]"
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

      <div className="text-center leading-tight mt-12 sm:mt-16 md:mt-20 px-4 transition-colors duration-300 cursor-pointer" style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
        <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight block sm:inline" style={{ fontFamily: 'Space Grotesk, monospace', letterSpacing: '-0.02em' }}>
          Screenshare done right—
        </span>
        <span className="text-gray-100 text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight block sm:inline" style={{ fontFamily: 'Space Grotesk, monospace', letterSpacing: '-0.02em' }}>
          and everything else too.
        </span>
      </div>

      <div className="mt-12 sm:mt-16 px-4 sm:px-8 md:px-12 lg:px-20 max-w-6xl mx-auto">
        {/* Top 3 features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {features.slice(0, 3).map((feature) => (
            <div key={feature.id} className="text-left">
              <h3
                className="text-white text-lg sm:text-xl font-bold mb-2"
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

        {/* Bottom 3 features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.slice(3, 6).map((feature) => (
            <div key={feature.id} className="text-left">
              <h3
                className="text-white text-lg sm:text-xl font-bold mb-2"
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

      <div className="flex flex-col items-center mt-32 sm:mt-40 md:mt-48 lg:mt-60 px-4">
        <div className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight" style={{ fontFamily: 'Space Grotesk, monospace', letterSpacing: '-0.02em' }}>
          powered by THE API COMMUNITY
        </div>
        
        {/* Logo */}
        <div className="mt-6 sm:mt-8">
          <img src={api} alt="API Community Logo" className="h-32 sm:h-40 md:h-50 w-auto" />
        </div>
      </div>
    
      <div className="flex flex-col items-center mt-12 sm:mt-16 md:mt-20 px-4">
        <div className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight" style={{ fontFamily: 'Space Grotesk, monospace', letterSpacing: '-0.02em' }}>
          Where screens meet minds
        </div>

        <div className="text-gray-400 uppercase text-xs sm:text-sm font-medium text-center mt-3 px-4">
          join, code together, share, and create magic in every line.
        </div>
      </div>
      
      <div className="bg-white py-12 sm:py-16 lg:py-24 mt-12 sm:mt-16 lg:mt-24 w-full">
        <div className="px-4 sm:px-8 lg:px-20 max-w-6xl mx-auto">
          {/* Local Dev Features Section */}
          <div className="w-full">
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

        {/* Upcomings Section */}
        <div className="flex flex-col items-center mt-12 sm:mt-16 px-4">
          {/* Top Center Link */}
          <Link to="/upcomings">
            <div className="flex justify-center items-center">
              <button className="uppercase px-6 sm:px-8 py-1.5 text-gray-800 font-semibold text-xs sm:text-sm rounded-full bg-white/80 backdrop-blur-md border border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition-all duration-300">
                Read the upcomings 
              </button>
            </div>
          </Link>

       {/* Links Container */}
<div className="flex flex-col items-center w-full mt-8 sm:mt-10 max-w-5xl">
  <Link 
    to="/iosbeta" 
    className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-7/12 py-3 sm:py-4 flex justify-between items-center border-b border-black/20 hover:bg-gray-100/50 transition-colors duration-200 px-2 sm:px-0"
  >
    <span className="uppercase text-black text-xs sm:text-sm font-medium">IOS Beta</span>
    <span className="text-xs sm:text-sm font-normal text-gray-400" style={{fontFamily: 'GT Pressura Mono, monospace'}}>SOON</span>
  </Link>

  <Link 
    to="/room" 
    className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-7/12 py-3 sm:py-4 flex justify-between items-center border-b border-black/20 hover:bg-gray-100/50 transition-colors duration-200 px-2 sm:px-0"
  >
    <span className="uppercase text-black text-xs sm:text-sm font-medium">Room</span>
    <span className="text-xs sm:text-sm font-normal text-gray-400" style={{fontFamily: 'GT Pressura Mono, monospace'}}>SOON</span>
  </Link>

  <Link 
    to="/newsletter" 
    className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-7/12 py-3 sm:py-4 flex justify-between items-center border-b border-black/20 hover:bg-gray-100/50 transition-colors duration-200 px-2 sm:px-0"
  >
    <span className="uppercase text-black text-xs sm:text-sm font-medium">Newsletter</span>
    <span className="text-xs sm:text-sm font-normal text-gray-400" style={{fontFamily: 'GT Pressura Mono, monospace'}}>SOON</span>
  </Link>

  <a 
    href="https://www.raycast.com/" 
    target="_blank"
    rel="noopener noreferrer"
    className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-7/12 py-3 sm:py-4 flex justify-between items-center border-b border-black/20 hover:bg-gray-100/50 transition-colors duration-200 px-2 sm:px-0"
  >
    <span className="uppercase text-black text-xs sm:text-sm font-medium">Raycast</span>
    <span className="text-xs sm:text-sm font-normal text-gray-400" style={{fontFamily: 'GT Pressura Mono, monospace'}}>SOON</span>
  </a>

  <a 
    href="https://testflight.apple.com/join/LnpuuI7d" 
    target="_blank"
    rel="noopener noreferrer"
    className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-7/12 py-3 sm:py-4 flex justify-between items-center border-b border-black/20 hover:bg-gray-100/50 transition-colors duration-200 px-2 sm:px-0"
  >
    <span className="uppercase text-black text-xs sm:text-sm font-medium">TestFlight</span>
    <span className="text-xs sm:text-sm font-normal text-gray-400" style={{fontFamily: 'GT Pressura Mono, monospace'}}>SOON</span>
  </a>
</div>

        </div>
      </div>
      <Footer />
    </div>
    
  
  );
  
};

export default Home;