import React, { useState, useEffect } from "react";
import MapView from "./components/MapView";
import ParkList from "./components/ParkList";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [parks, setParks] = useState([]);
  const [completed, setCompleted] = useLocalStorage("completedParks", []);

  // Load parks data from public folder
  useEffect(() => {
    fetch("/parks-data.json")
      .then((res) => res.json())
      .then((data) => setParks(data))
      .catch((err) => console.error("Error loading parks data:", err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <header>
        <Header />
      </header>
      <div style={{ flex: "1 1 30%", background: "#f9f9f9" }}>
        <ParkList
          parks={parks}
          completed={completed}
          setCompleted={setCompleted}
        />
      </div>
      <div style={{ flex: "1 1 70%" }}>
        <MapView parks={parks} completed={completed} />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
