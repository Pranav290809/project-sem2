import React, { useEffect, useState } from "react";
import DonorCard from "./cards";
import { useLocation } from "react-router-dom";

function Donors({ data, bloodGroups, requestStatus, handleRequest }) {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [sortAvailability, setSortAvailability] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const group = params.get("group") || "";
    const city = params.get("city") || "";

    // Validate the group against the provided bloodGroups list.
    const validGroup = group && bloodGroups.includes(group) ? group : "";
    setSelectedGroup(validGroup);
    setCitySearch(city);
  }, [location.search, bloodGroups]);

  const filteredData = data.filter((user) => {
    const userBloodGroup = bloodGroups[user.id % bloodGroups.length];
    const matchesGroup = selectedGroup ? userBloodGroup === selectedGroup : true;
    const matchesCity = citySearch
      ? user.address.city.toLowerCase().includes(citySearch.toLowerCase())
      : true;
    return matchesGroup && matchesCity;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortAvailability === "availableFirst")
      return (b.id % 2 === 0) - (a.id % 2 === 0);
    if (sortAvailability === "notAvailableFirst")
      return (a.id % 2 === 0) - (b.id % 2 === 0);
    return 0;
  });

  const inputCls =
    "glass-dark text-blue-100 placeholder-blue-400/50 border border-blue-700/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition-all duration-200 bg-transparent";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in-down">
        <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">Browse</span>
        <h2 className="text-4xl font-extrabold text-white mt-2">
          All <span className="gradient-text">Donors</span>
        </h2>
        <div className="mt-3 w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
      </div>

      {/* Filter bar */}
      <div className="max-w-3xl mx-auto glass-dark rounded-2xl p-5 mb-12 flex flex-wrap gap-4 items-center justify-center animate-scale-in">
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className={inputCls}
        >
          <option value="">🩸 All Blood Groups</option>
          {bloodGroups.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>

        <input
          type="text"
          placeholder="🏙️ Search by city..."
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
          className={inputCls}
        />

        <select
          value={sortAvailability}
          onChange={(e) => setSortAvailability(e.target.value)}
          className={inputCls}
        >
          <option value="">📋 Sort by availability</option>
          <option value="availableFirst">✅ Available First</option>
          <option value="notAvailableFirst">❌ Unavailable First</option>
        </select>
      </div>

      {/* Cards */}
      {sortedData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3 animate-fade-in">
          <span className="text-6xl">🔍</span>
          <p className="text-blue-300/60 text-xl">No donors found</p>
          <p className="text-blue-400/40 text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center animate-fade-in">
          {sortedData.map((user) => {
            const userBloodGroup = bloodGroups[user.id % bloodGroups.length];
            const available = user.id % 2 === 0;
            return (
              <DonorCard
                key={user.id}
                donor={{ ...user, bloodGroup: userBloodGroup, available }}
                onRequest={handleRequest}
                isRequested={requestStatus[user.id]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Donors;
