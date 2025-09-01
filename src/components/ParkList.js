import React, { useState } from "react";

export default function ParkList({ parks, completed, setCompleted }) {
  const [sortOption, setSortOption] = useState("name");

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

  const sortedParks = [...parks].sort((a, b) => {
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

  return (
    <div className="bg-white border-t" style={{ height: "30vh" }}>
      <div className="h-full flex flex-col">
        {/* Header with controls */}
        <div className="px-4 py-2 bg-gray-50 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <select
              className="text-xs bg-white border rounded px-2 py-1"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="name">A–Z</option>
              <option value="laps">Laps</option>
              <option value="elevation">Elevation</option>
              <option value="time">Avg Time</option>
            </select>
            <button
              onClick={() => setCompleted([])}
              className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2">
            {sortedParks.map((park) => (
              <div key={park.id} className="flex items-center py-1 text-sm">
                <input
                  type="checkbox"
                  checked={completed.includes(park.id)}
                  onChange={() => handleToggle(park.id)}
                  className="mr-2 flex-shrink-0"
                />
                <label className="flex-1 cursor-pointer truncate">
                  <span
                    className={
                      completed.includes(park.id)
                        ? "line-through text-green-600"
                        : ""
                    }
                  >
                    {park.name}
                  </span>
                  <span className="text-gray-500 text-xs ml-1">
                    {sortOption === "laps" && `(${park.laps || "N/A"} laps)`}
                    {sortOption === "elevation" &&
                      `(${park.elevation_gain_m || "N/A"}m)`}
                    {sortOption === "time" &&
                      `(${formatTime(park.average_finish_time)})`}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
