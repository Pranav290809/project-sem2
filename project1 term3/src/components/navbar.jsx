import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/Donors", label: "Donors" },
    { to: "/Requests", label: "Requests" },
  ];

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-500 ${scrolled ? "glass-dark shadow-2xl shadow-blue-900/40" : "bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex items-center gap-3 animate-fade-in-down">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-40 pulse-ring"></div>
            <div className="h-12 w-12 rounded-full bg-blue-700 border-2 border-blue-400 relative z-10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                {/* Heart */}
                <path d="M12 21C12 21 3 14 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14 14 21 12 21Z" fill="#f87171" stroke="#fca5a5" strokeWidth="1"/>
                {/* Cross */}
                <rect x="11" y="7" width="2" height="7" rx="1" fill="white"/>
                <rect x="8.5" y="9.5" width="7" height="2" rx="1" fill="white"/>
              </svg>
            </div>
          </div>
          <span className="hidden sm:block gradient-text text-xl font-bold tracking-wide">
            LifeLink
          </span>
        </div>

        {/* Center */}
        <div className="hidden md:flex flex-col items-center animate-fade-in-down delay-200">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-wider">
             LifeLink
          </h1>
          <p className="text-blue-300 text-xs tracking-widest uppercase mt-0.5">
            Connecting Lives, One Drop at a Time
          </p>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2 animate-fade-in-down delay-300">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 group ${
                location.pathname === link.to
                  ? "text-white bg-blue-600/50"
                  : "text-blue-200 hover:text-white"
              }`}
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-0 rounded-lg bg-blue-500/20 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-blue-700/50 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-400 ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="glass-dark px-6 py-4 space-y-2 border-t border-blue-700/40">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block text-blue-100 hover:text-white hover:bg-blue-700/40 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
