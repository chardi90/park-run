import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import MapView from "./components/MapView";
import ParkList from "./components/ParkList";
import Footer from "./components/Footer";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [parks, setParks] = useState([]);
  const [completed, setCompleted] = useLocalStorage("completedParks", []);
  // Handle park data loading error
  useEffect(() => {
    fetch("/parks-data.json")
      .then((res) => res.json())
      .then((data) => setParks(data))
      .catch((err) => console.error("Error loading parks data:", err));
  }, []);
  // Record runners date/time in array of objects for each park
  useEffect(() => {
    if (completed.length > 0 && typeof completed[0] === "number") {
      const migrated = completed.map((id) => ({ id, date: "", time: "" }));
      setCompleted(migrated);
    }
  }, [completed, setCompleted]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        <Header />
        <ProgressBar completed={completed} total={parks.length} />
      </div>

      <div style={{ height: "50vh" }}>
        <MapView parks={parks} completed={completed} />
      </div>

      <div className="min-h-screen">
        <ParkList
          parks={parks}
          completed={completed}
          setCompleted={setCompleted}
        />
      </div>

      <Footer />
    </div>
  );
}
