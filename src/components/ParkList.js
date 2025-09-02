import React, { useState, useMemo } from "react";

export default function ParkList({ parks, completed, setCompleted }) {
  const [sortOption, setSortOption] = useState("name");
  const [locationFilter, setLocationFilter] = useState("location");

  const locations = useMemo(() => {
    const locationSet = new Set();
    parks.forEach((park) => {
      let place = "Other";
      const loc = park.location.toLowerCase();

      if (loc.includes("bolton")) place = "Bolton";
      else if (loc.includes("bury")) place = "Bury";
      else if (loc.includes("manchester")) place = "Manchester";
      else if (loc.includes("oldham")) place = "Oldham";
      else if (loc.includes("rochdale")) place = "Rochdale";
      else if (loc.includes("salford")) place = "Salford";
      else if (loc.includes("stockport")) place = "Stockport";
      else if (loc.includes("tameside")) place = "Tameside";
      else if (loc.includes("trafford")) place = "Trafford";
      else if (loc.includes("wigan")) place = "Wigan";

      locationSet.add(place);
    });
    return Array.from(locationSet).sort();
  }, [parks]);

  const handleToggle = (id) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((pid) => pid !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  const formatTime = (mins) => {
    if (mins == null) return "N/A";
    const totalSeconds = Math.round(mins * 60);
    const mm = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const ss = (totalSeconds % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const filteredParks = useMemo(() => {
    if (locationFilter === "all") return parks;

    return parks.filter((park) => {
      const location = park.location.toLowerCase();
      let parkLocation = "Other";

      if (location.includes("bolton")) parkLocation = "Bolton";
      else if (location.includes("bury")) parkLocation = "Bury";
      else if (location.includes("manchester")) parkLocation = "Manchester";
      else if (location.includes("oldham")) parkLocation = "Oldham";
      else if (location.includes("rochdale")) parkLocation = "Rochdale";
      else if (location.includes("salford")) parkLocation = "Salford";
      else if (location.includes("stockport")) parkLocation = "Stockport";
      else if (location.includes("tameside")) parkLocation = "Tameside";
      else if (location.includes("trafford")) parkLocation = "Trafford";
      else if (location.includes("wigan")) parkLocation = "Wigan";

      return parkLocation === locationFilter;
    });
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
                Parks List ({sortedParks.length} of {parks.length})
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
