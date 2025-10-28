import React, { useEffect, useRef, useState } from 'react';
import Header from "../component/Header";
import { Link } from 'react-router-dom';
import macc from '../assets/macaman/macc.png';
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
    <>
    <Header />

    <div className="w-full overflow-x-hidden mt-15">
      <Link to="/signup">
        <div className="flex justify-center items-center mt-15 sm:mt-12 px-4">
          <button className="uppercase px-6 sm:px-8 py-1.5 text-gray-200 font-semibold text-xs sm:text-sm rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl">
            Go to the Dashboard
          </button>
        </div>
      </Link>

      <div className=" mt-8 sm:mt-10 px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col items-center">
        {/* Top large headings */}
        <div className="uppercase   text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight" style={{ fontFamily: 'Sora, sans-serif', fontWeight: '700', letterSpacing: '-0.03em' }}>
          Under LocalDev, we're bringing
        </div>
        <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-3" style={{ fontFamily: 'Sora, sans-serif', fontWeight: '700', letterSpacing: '0.05em' }}>
          "remotelyOS"
        </div>

        {/* Tagline below */}
        <div className="mt-6 sm:mt-8">
          <div className="text-gray-400 uppercase text-xs sm:text-sm font-medium text-center tracking-wider">
            The Future of Distributed Development
          </div>
        </div>
      </div>

     <div className="relative w-full overflow-hidden bg-black py-8 sm:py-12 md:py-16">
  <div
    ref={macContainerRef}
    className="relative px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 max-w-screen-5xl mx-auto"
  >
    <img
      src={macc}
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

      <div className="text-center leading-tight mt-12 sm:mt-16 md:mt-20 px-4 transition-colors duration-300 cursor-pointer">
        <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight block sm:inline" style={{ fontFamily: 'Sora, sans-serif', fontWeight: '700', letterSpacing: '-0.03em' }}>
          Screenshare done right—
        </span>
        <span className="text-gray-100 text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight block sm:inline" style={{ fontFamily: 'Sora, sans-serif', fontWeight: '700', letterSpacing: '-0.03em' }}>
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

      {/* New LocalDev Introduction Section */}
      <div className="mt-32 sm:mt-40 md:mt-48 px-4 sm:px-8 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/20 pt-18">
        <div className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center leading-tight mb-8" style={{ fontFamily: 'Sora, sans-serif', fontWeight: '700', letterSpacing: '-0.03em' }}>
          Where Ambitious Builders Build, Validate, and Scale Together
        </div>
        
        <div className="text-gray-300 text-base sm:text-lg leading-relaxed text-center mb-12" style={{ fontFamily: 'Inter, sans-serif' }}>
          LocalDev is a vibrant, community-driven ecosystem for technical students, indie founders, and aspiring builders. 
          Break free from isolated development and slow feedback cycles with the knowledge, support, and opportunities to grow your ideas into real projects and startups.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="text-left">
            <h3 className="text-white text-xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Learn by Doing
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Hands-on learning focused on AI, developer tools, and startup best practices.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-white text-xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Build in Public
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Transparency and collaboration foster accountability, feedback, and growth.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-white text-xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Community First
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              A radically supportive network of creators who share, help, and celebrate wins and failures alike.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-white text-xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Validated Launches
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Access early users, mentorship, and community-powered validation to increase your chances of success.
            </p>
          </div>
        </div>

        {/* LocalDev Studio Coming Soon */}
        <div className="bg-gradient-to-r from-black-900/20 to-black-900/20 border border-white-500/20 rounded-2xl p-8 sm:p-10 mb-12  hover:bg-white/10 transition-all duration-300 ">
          <div className="text-purple-300 uppercase text-xs font-semibold tracking-wider mb-4">Coming Soon</div>
          <h3 className="text-white text-2xl sm:text-3xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif', fontWeight: '700' }}>
            LocalDev Studio
          </h3>
          <p className="text-gray-300 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Your all-in-one platform to launch projects, connect with early users, gain meaningful validation, and distribute your startup within our fast-growing community. 
            Turn your ideas into thriving products with the support of builders like you.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-300 text-lg sm:text-xl mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            Join thousands of builders who are learning, creating, and launching smarter.
          </p>
        <div className="flex justify-center items-center mt-15 sm:mt-12 px-4">
  <a
    href="https://linktr.ee/localdev"
    target="_blank"
    rel="noopener noreferrer"
    className="uppercase px-6 sm:px-8 py-1.5 text-gray-200 font-semibold text-xs sm:text-sm rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
  >
    Join the community
  </a>
</div>

        </div>
      </div>

      {/* Minimized API Community Section */}
      <div className="flex flex-col items-center mt-32 sm:mt-10 px-4">
        <div className="text-gray-500 text-xs sm:text-sm font-medium text-center uppercase tracking-wider mb-3">
          powered by
        </div>
        <img src={api} alt="API Community" className="h-12 sm:h-16 w-auto " />
      </div>
    
      <div className="flex flex-col items-center mt-20 sm:mt-24 md:mt-10 px-4">
       

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
    </>
  );
};

export default Home;