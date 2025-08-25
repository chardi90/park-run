import React, { useState, useMemo } from "react";

export default function ParkList({ parks, completed, setCompleted }) {
  const [sortOption, setSortOption] = useState("name");

  const handleToggle = (id) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((pid) => pid !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear your progress?")) {
      setCompleted([]);
    }
  };

  const sortedParks = useMemo(() => {
    const parksCopy = [...parks];

    switch (sortOption) {
      case "name":
        return parksCopy.sort((a, b) => a.name.localeCompare(b.name));
      case "laps":
        return parksCopy.sort((a, b) => (a.laps || 0) - (b.laps || 0));
      case "elevation":
        return parksCopy.sort(
          (a, b) => (a.elevation_gain_m || 0) - (b.elevation_gain_m || 0)
        );
      case "time":
        return parksCopy.sort(
          (a, b) => (a.average_finish_time || 0) - (b.average_finish_time || 0)
        );
      default:
        return parksCopy;
    }
  }, [parks, sortOption]);

  const formatTime = (mins) => {
    if (mins == null) return "N/A";
    const totalSeconds = Math.round(mins * 60);
    const hh = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const mm = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const ss = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  // Update getExtraInfo to use formatTime
  const getExtraInfo = (park) => {
    switch (sortOption) {
      case "laps":
        return park.laps ? `(${park.laps} laps)` : "(laps N/A)";
      case "elevation":
        return park.elevation_gain_m
          ? `(${park.elevation_gain_m} m gain)`
          : "(gain N/A)";
      case "time":
        return park.average_finish_time
          ? `(${formatTime(park.average_finish_time)})`
          : "(time N/A)";
      default:
        return "";
    }
  };

  return (
    <div className="parklist-container">
      <div className="parklist-header">
        <label>
          Sort by:{" "}
          <select
            className="parklist-sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name">A–Z</option>
            <option value="laps">Number of Laps</option>
            <option value="elevation">Elevation Gain</option>
            <option value="time">Average Time</option>
          </select>
        </label>

        <button className="clear-btn" onClick={handleReset}>
          Clear Progress
        </button>
      </div>

      <ul className="parklist">
        {sortedParks.map((park) => (
          <li key={park.id} className="parklist-item">
            <label>
              <input
                type="checkbox"
                checked={completed.includes(park.id)}
                onChange={() => handleToggle(park.id)}
              />{" "}
              {park.name} {getExtraInfo(park)}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
