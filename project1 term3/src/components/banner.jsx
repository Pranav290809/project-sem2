import React, { useEffect, useState } from "react";

function Banner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75"
        style={{
          backgroundImage: "url('/src/assets/banner-bg.png')",
        }}
      />
      {/* Blue tint overlay */}
      <div className="absolute inset-0 bg-blue-950/55"></div>

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float" style={{animationDelay:"1.5s"}}></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl py-24">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-blue-200 text-sm font-medium mb-8 ${visible ? "animate-fade-in-down" : "opacity-0"}`}>
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          India's Trusted Blood Donor Network
        </div>

        {/* Heading */}
        <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 leading-tight ${visible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
          <span className="gradient-text">Every Drop</span>
          <br />
          <span className="text-white">Counts.</span>
        </h1>

        {/* Subtext */}
        <p className={`text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-2xl mx-auto mb-10 ${visible ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
          Blood cannot be manufactured — it can only come from generous donors like you. 
          Find a verified donor near you in seconds, or register to become a lifesaver today.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center ${visible ? "animate-fade-in-up delay-500" : "opacity-0"}`}>
          <a
            href="#/Donors"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-1"
          >
            🔍 Find a Donor
          </a>
          <a
            href="#/Requests"
            className="px-8 py-3 glass text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/20 hover:-translate-y-1"
          >
            📋 View My Requests
          </a>
        </div>

        {/* Stats */}
        <div className={`mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto ${visible ? "animate-fade-in-up delay-700" : "opacity-0"}`}>
          {[
            { value: "10+", label: "Verified Donors" },
            { value: "8+", label: "Cities Covered" },
            { value: "100%", label: "Free to Use" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold gradient-text">{stat.value}</div>
              <div className="text-blue-300 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-blue-300/60 animate-float">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

export default Banner;
