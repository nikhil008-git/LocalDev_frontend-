import React, { useState } from 'react';
import waitlist from '../assets/waitlist/waitlist.png'; // Make sure path & filename are correct
import Dashboard_header from "../component/Dashboard_header";

export default function LocalDevWaitlist() {
  const [activeTab, setActiveTab] = useState('waitlist');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setErrorMessage('Email is required');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 3000);
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 2000);
    }, 1000);
  };

  return (
    <>
      <Dashboard_header />

      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Image */}
        <img 
          src={waitlist}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

        <div className="w-full max-w-xl relative z-10">
          {/* Toggle Buttons */}
          <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-full p-1 mb-6 flex shadow-2xl w-fit mx-auto">
            <button
              onClick={() => setActiveTab('waitlist')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                activeTab === 'waitlist'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Waitlist
            </button>
            <button
              onClick={() => setActiveTab('manifesto')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                activeTab === 'manifesto'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Manifesto
            </button>
          </div>

          {/* Content Box */}
          <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
            {activeTab === 'waitlist' ? (
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Supercharge your dev workflow with LocalDev.
                </h1>
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  LocalDev saves your project context, remembers your preferences, and eliminates repetitive setup. 
                  Join our waitlist and be among the first to experience smarter, faster development.
                </p>

                <div className="relative">
                  <div className="flex items-center gap-3 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={status === 'loading'}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubmit(e);
                      }}
                      className="flex-1 text-sm pl-6 pr-32 py-3 h-12 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 rounded-full border border-white/20 focus:outline-none focus:border-white/40 transition-all"
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={status === 'loading'}
                      className="absolute h-9 px-5 bg-white/10 text-white text-sm top-1/2 transform -translate-y-1/2 right-1.5 rounded-full font-medium hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading'
                        ? 'Joining…'
                        : status === 'success'
                        ? 'Joined!'
                        : 'Join Waitlist'}
                    </button>
                  </div>
                  {errorMessage && (
                    <p className="absolute text-xs text-red-400 top-full mt-2 px-2">{errorMessage}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Our Manifesto
                </h1>
                <div className="text-gray-300 text-base leading-relaxed space-y-3">
                  <p>
                    At LocalDev, we believe that developers deserve a platform that gives them complete control, context, 
                    and seamless workflow. Our mission is to deliver a local development solution that empowers developers 
                    to work on their own terms—free from repetitive setup, scattered tools, and context loss.
                  </p>
                  <p>
                    By keeping your projects, preferences, and workflows in one place, LocalDev ensures that your environment 
                    adapts to you, giving you the freedom and focus to build what matters most.
                  </p>
                  <p>
                    Our platform is built for developers who value independence, speed, and reliability, enabling them to 
                    thrive in an environment designed to meet their unique needs. Join us in redefining development with a 
                    solution that puts you back in control.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-gray-400 text-xs mb-2">@ LocalDev</p>
                  <a
                    href="https://linktr.ee/localdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors font-medium"
                  >
                    Follow LocalDev
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
