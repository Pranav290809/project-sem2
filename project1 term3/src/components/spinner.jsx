import React from "react";

export default function Spinner() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-blue-950 flex flex-col justify-center items-center gap-6">
      {/* Outer ring */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-blue-900"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute inset-3 rounded-full border-4 border-t-indigo-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
        <div className="absolute inset-0 flex items-center justify-center text-2xl"></div>
      </div>
      <div className="text-center">
        <p className="gradient-text text-lg font-bold">Loading</p>
        <p className="text-blue-400/50 text-xs mt-1">Fetching donor data...</p>
      </div>
    </div>
  );
}
