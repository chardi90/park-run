import React, { useState, useEffect } from "react";
import MapView from "./components/MapView";
import ParkList from "./components/ParkList";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";

export default function App() {
  const [parks, setParks] = useState([]);
  const [completed, setCompleted] = useLocalStorage("completedParks", []);

  useEffect(() => {
    fetch("/parks-data.json")
      .then((res) => res.json())
      .then((data) => setParks(data))
      .catch((err) => console.error("Error loading parks data:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProgressBar completed={completed} total={parks.length} />
      <div style={{ height: "60vh" }}>
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
