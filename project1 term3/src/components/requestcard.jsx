import React from "react";

export default function RequestCard({ donor }) {
  return (
    <div className="card-glow glass-dark rounded-2xl overflow-hidden w-72 transform transition-all duration-400 hover:-translate-y-2 hover:scale-[1.02]">
      {/* Accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
            {donor.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-white font-bold">{donor.name}</h2>
            <span className="px-2 py-0.5 bg-blue-900/60 border border-blue-500/40 text-blue-300 font-bold rounded-full text-xs">
              {donor.bloodGroup}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          {[
            { label: "Username", value: donor.username },
            { label: "Email", value: donor.email },
            { label: "Phone", value: donor.phone },
            { label: "City", value: `${donor.address.city}, ${donor.address.street}` },
          ].map((item) => (
            <div key={item.label} className="flex gap-2">
              <span className="text-blue-400/60 w-20 flex-shrink-0 text-xs pt-0.5">{item.label}</span>
              <span className="text-blue-100/80 text-xs break-all">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="mt-5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Available
          </span>
          <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-blue-500/30">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
