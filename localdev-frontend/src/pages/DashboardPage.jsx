import React, { useState } from 'react';
import useWaitlistStore from '../store/waitlistStore';
import waitlist from '../assets/waitlist/waitlist.png';
import Header from '../component/Dashboard_header';

export default function LocalDevWaitlist() {
  const { joinWaitlist, loading, error, resetState } = useWaitlistStore();
  const [activeTab, setActiveTab] = useState('waitlist');
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');
  const [status, setStatus] = useState('idle'); // idle, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setLocalError("Email is required");
      setTimeout(() => setLocalError(''), 3000);
      return;
    }

    setStatus('loading');
    const result = await joinWaitlist(email);

    if (result.success) {
      setStatus('success');
      setEmail('');
      setTimeout(() => {
        setStatus('idle');
        resetState();
      }, 2500);
    } else {
      setStatus('error');
      setLocalError(result.message);
      setTimeout(() => setLocalError(''), 4000);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <img src={waitlist} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

        <div className="w-full max-w-xl relative z-10">
          {/* Tabs */}
          <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-full p-1 mb-6 flex shadow-2xl w-fit mx-auto">
            {['waitlist', 'manifesto'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeTab === tab ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
            {activeTab === 'waitlist' ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Supercharge your dev workflow with LocalDev.
                </h1>
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  Save project context, preferences, and eliminate repetitive setup. Join our waitlist to experience smarter development.
                </p>

                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={loading}
                    className="flex-1 text-sm pl-6 pr-32 py-3 h-12 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 rounded-full border border-white/20 focus:outline-none focus:border-white/40 transition-all w-full"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute h-9 px-5 bg-white/10 text-white text-sm top-1/2 transform -translate-y-1/2 right-1.5 rounded-full font-medium hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? 'Joining…'
                      : status === 'success'
                      ? 'Joined!'
                      : 'Join Waitlist'}
                  </button>

                  {(localError || error) && (
                    <p className="absolute text-xs text-red-400 top-full mt-2 px-2">
                      {localError || error}
                    </p>
                  )}
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-gray-300 text-base leading-relaxed">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Manifesto</h1>
                <p>
                  At LocalDev, we believe that developers deserve a platform that gives them complete control, context, 
                  and seamless workflow. Our mission is to deliver a local development solution that empowers developers 
                  to work on their own terms—free from repetitive setup, scattered tools, and context loss.
                </p>
                <p className="text-gray-400 text-xs mt-4">
                  @ LocalDev — <a href="https://linktr.ee/localdev" className="underline hover:text-white">Follow us</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
