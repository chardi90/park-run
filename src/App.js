import React, { useState, useEffect, useRef } from "react";
import MapView from "./components/MapView";
import ParkList from "./components/ParkList";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [parks, setParks] = useState([]);
  const [completed, setCompleted] = useLocalStorage("completedParks", []);

  // Desktop: width of list
  const [listWidth, setListWidth] = useState(300);
  // Mobile: height of list
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.4);

  const isDragging = useRef(false);
  const dragMode = useRef("horizontal"); // "horizontal" or "vertical"

  useEffect(() => {
    fetch("/parks-data.json")
      .then((res) => res.json())
      .then((data) => setParks(data))
      .catch((err) => console.error("Error loading parks data:", err));
  }, []);

  const handleMouseDown = (mode) => {
    isDragging.current = true;
    dragMode.current = mode;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    if (dragMode.current === "horizontal") {
      const newWidth = Math.min(
        Math.max(e.clientX, 150),
        window.innerWidth * 0.5
      );
      setListWidth(newWidth);
    } else if (dragMode.current === "vertical") {
      const newHeight = Math.min(
        Math.max(e.clientY, 100),
        window.innerHeight * 0.8
      );
      setListHeight(newHeight);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="container">
      <header>
        <Header />
      </header>

      <div className="content-container">
        {/* Sidebar / Top list */}
        <div
          className="Park-list"
          style={{
            width: window.innerWidth > 768 ? listWidth : "100%",
            height: window.innerWidth <= 768 ? listHeight : "auto",
          }}
        >
          <ParkList
            parks={parks}
            completed={completed}
            setCompleted={setCompleted}
          />
        </div>

        {/* Divider */}
        <div
          className="divider"
          onMouseDown={() =>
            handleMouseDown(window.innerWidth > 768 ? "horizontal" : "vertical")
          }
        ></div>

        {/* Map */}
        <div className="Map-view">
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
