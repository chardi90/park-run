import React, { useState, useMemo } from "react";

export default function ParkList({ parks, completed, setCompleted }) {
  const [sortOption, setSortOption] = useState("name");
  const [locationFilter, setLocationFilter] = useState("all");

  function normaliseLocation(rawLocation) {
    const loc = rawLocation.toLowerCase();
    if (loc.includes("bolton")) return "Bolton";
    if (loc.includes("bury")) return "Bury";
    if (loc.includes("manchester")) return "Manchester";
    if (loc.includes("oldham")) return "Oldham";
    if (loc.includes("rochdale")) return "Rochdale";
    if (loc.includes("salford")) return "Salford";
    if (loc.includes("stockport")) return "Stockport";
    if (loc.includes("tameside")) return "Tameside";
    if (loc.includes("trafford")) return "Trafford";
    if (loc.includes("wigan")) return "Wigan";
    return "Other";
  }

  const locations = useMemo(() => {
    return Array.from(
      new Set(parks.map((p) => normaliseLocation(p.location)))
    ).sort();
  }, [parks]);

  const handleToggle = (id) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((pid) => pid !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  const formatTime = (mins) => {
    if (!mins) return "N/A";
    const totalSeconds = Math.round(mins * 60);
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const ss = String(totalSeconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const filteredParks = useMemo(() => {
    if (locationFilter === "all") return parks;
    return parks.filter(
      (p) => normaliseLocation(p.location) === locationFilter
    );
  }, [parks, locationFilter]);

  const sortedParks = useMemo(() => {
    return [...filteredParks].sort((a, b) => {
      switch (sortOption) {
        case "name":
          return a.name.localeCompare(b.name);
        case "laps":
          return (a.laps || 0) - (b.laps || 0);
        case "elevation":
          return (a.elevation_gain_m || 0) - (b.elevation_gain_m || 0);
        case "time":
          return (a.average_finish_time || 0) - (b.average_finish_time || 0);
        default:
          return 0;
      }
    });
  }, [filteredParks, sortOption]);

  return (
    <div className="bg-white">
      <div className="sticky top-0 bg-white z-10 border-b shadow-sm">
        <div className="px-4 py-3 bg-gray-50">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">
                Parkruns In Greater Manchester ({sortedParks.length} of{" "}
                {parks.length})
              </h2>
              <button
                onClick={() => setCompleted([])}
                className="text-xs bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Clear All
              </button>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  className="w-full text-sm bg-white border rounded px-3 py-2"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="all">All locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Sort by
                </label>
                <select
                  className="w-full text-sm bg-white border rounded px-3 py-2"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="name">A–Z</option>
                  <option value="laps">Laps</option>
                  <option value="elevation">Elevation</option>
                  <option value="time">Avg Time</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {sortedParks.map((park) => (
          <div
            key={park.id}
            className="flex items-center py-3 border-b border-gray-100 hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={completed.includes(park.id)}
              onChange={() => handleToggle(park.id)}
              className="mr-3 flex-shrink-0 w-4 h-4"
            />
            <label className="flex-1 cursor-pointer">
              <div className="flex flex-col">
                <span
                  className={`font-medium ${
                    completed.includes(park.id) ? "line-through" : ""
                  }`}
                  style={{
                    color: completed.includes(park.id)
                      ? "var(--color-primary)"
                      : "inherit",
                  }}
                >
                  {park.name}
                </span>
                <div className="text-sm text-gray-500 mt-1">
                  <span>{park.location}</span>
                  {sortOption === "laps" && (
                    <span className="ml-3">{park.laps || "N/A"} laps</span>
                  )}
                  {sortOption === "elevation" && (
                    <span className="ml-3">
                      {park.elevation_gain_m || "N/A"}m elevation
                    </span>
                  )}
                  {sortOption === "time" && (
                    <span className="ml-3">
                      {formatTime(park.average_finish_time)} avg
                    </span>
                  )}
                </div>
              </div>
            </label>
          </div>
        ))}

        {sortedParks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No parks found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
