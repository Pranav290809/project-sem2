import React, { useState } from "react";
import RequestCard from "./requestcard";

function Requests({ data, bloodGroups, requestStatus }) {
  const [citySearch, setCitySearch] = useState("");

  const requestedUsers = data.filter((user) => requestStatus[user.id]);
  const filteredUsers = requestedUsers.filter((user) =>
    citySearch ? user.address.city.toLowerCase().includes(citySearch.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in-down">
        <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">My List</span>
        <h2 className="text-4xl font-extrabold text-white mt-2">
          Requested <span className="gradient-text">Donors</span>
        </h2>
        <div className="mt-3 w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-8"></div>

        <input
          type="text"
          placeholder="🏙️ Search by city..."
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
          className="glass-dark text-blue-100 placeholder-blue-400/50 border border-blue-700/40 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-blue-400 transition-all duration-200 bg-transparent w-72"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3 animate-fade-in">
          <span className="text-6xl">📋</span>
          <p className="text-blue-300/60 text-xl">No requests yet</p>
          <p className="text-blue-400/40 text-sm">
            Head to <span className="text-blue-400">Donors</span> and request help
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center animate-fade-in">
          {filteredUsers.map((user) => {
            const userBloodGroup = bloodGroups[user.id % bloodGroups.length];
            const available = user.id % 2 === 0;
            return (
              <RequestCard
                key={user.id}
                donor={{ ...user, bloodGroup: userBloodGroup, available }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Requests;
