import React from "react";

export default function DonorCard({ donor, onRequest, isRequested }) {
  const available = donor.available;

  return (
    <div className="card-glow glass-dark rounded-2xl overflow-hidden w-80 transform transition-all duration-400 hover:-translate-y-2 hover:scale-[1.02] group">
      {/* Top accent bar */}
      <div className={`h-1.5 w-full ${available ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-gradient-to-r from-slate-600 to-slate-700"}`}></div>

      <div className="p-6">
        {/* Avatar + Name */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0 ${available ? "bg-blue-700" : "bg-slate-700"}`}>
            {donor.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">{donor.name}</h2>
            <p className="text-blue-300/60 text-xs">@{donor.username || "donor"}</p>
          </div>
        </div>

        {/* Blood Group */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-blue-300/60 text-sm w-28 flex-shrink-0">Blood Group</span>
          <span className="px-3 py-0.5 bg-blue-900/60 border border-blue-500/40 text-blue-300 font-bold rounded-full text-sm">
            {donor.bloodGroup}
          </span>
        </div>

        {/* City */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-blue-300/60 text-sm w-28 flex-shrink-0">Location</span>
          <span className="text-white text-sm truncate">
            📍 {donor.address.city}
          </span>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-blue-300/60 text-sm w-28 flex-shrink-0">Availability</span>
          <span
            className={`px-3 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${
              available
                ? "bg-emerald-900/50 text-emerald-300 border border-emerald-500/40"
                : "bg-slate-700/50 text-slate-400 border border-slate-600/40"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${available ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`}></span>
            {available ? "Available" : "Unavailable"}
          </span>
        </div>

        {/* Request Button */}
        {available && (
          <button
            onClick={() => onRequest(donor.id)}
            className={`w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 ${
              isRequested
                ? "bg-emerald-700/70 border border-emerald-500/40 cursor-default"
                : "bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
            }`}
          >
            {isRequested ? "✅ Request Sent" : "Request Help"}
          </button>
        )}
      </div>
    </div>
  );
}
