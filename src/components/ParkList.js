import React from "react";

export default function ParkList({ parks, completed, setCompleted }) {
  const handleToggle = (id) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((pid) => pid !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear your progress?")) {
      setCompleted([]); // This will also clear localStorage via the hook
    }
  };

  return (
    <div style={{ padding: "1rem", maxHeight: "100vh", overflowY: "auto" }}>
      <h2>Greater Manchester Parkruns</h2>

      {/* Reset button */}
      <button
        onClick={handleReset}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          background: "#ff4d4d",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Clear Progress
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {parks.map((park) => (
          <li key={park.id} style={{ marginBottom: "0.5rem" }}>
            <label>
              <input
                type="checkbox"
                checked={completed.includes(park.id)}
                onChange={() => handleToggle(park.id)}
              />{" "}
              {park.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
