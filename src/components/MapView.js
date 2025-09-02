import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 0);
  }, [map]);
  return null;
}

const createCustomIcon = (color) => {
  const svgIcon = `
    <svg
      width="25"
      height="41"
      viewBox="0 0 25 41"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 0C5.6 0 0 5.6 0 12.5c0 6.9 12.5 28.5 12.5 28.5s12.5-21.6 12.5-28.5C25 5.6 19.4 0 12.5 0z"
        fill="${color}"
        stroke="#000"
        stroke-width="1"
      />
      <circle cx="12.5" cy="12.5" r="6" fill="#fff" />
    </svg>
  `;

  return new L.DivIcon({
    html: svgIcon,
    className: "custom-marker",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -30],
  });
};

const completedIcon = createCustomIcon("var(--color-primary)");
const uncompletedIcon = createCustomIcon("var(--color-accent)");

const formatTime = (mins) => {
  if (mins == null) return "N/A";
  const totalSeconds = Math.round(mins * 60);
  const mm = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = (totalSeconds % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
};

export default function MapView({ parks, completed, height }) {
  const mapHeightPx =
    typeof height === "number" ? `${height}px` : height || "50vh";

  return (
    <div style={{ height: mapHeightPx }} className="relative">
      <MapContainer
        center={[53.4808, -2.2426]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <ResizeHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {parks.map((park) => {
          const isCompleted = completed.includes(park.id);
          return (
            <Marker
              key={park.id}
              position={[park.lat, park.lng]}
              icon={isCompleted ? completedIcon : uncompletedIcon}
            >
              <Popup>
                <div style={{ minWidth: "200px" }}>
                  <strong style={{ fontSize: "16px" }}>{park.name}</strong>
                  <br />
                  <span style={{ color: "#666" }}>
                    {park.location}, {park.postcode}
                  </span>
                  <span
                    style={{
                      color: isCompleted
                        ? "var(--color-primary)"
                        : "var(--color-accent)",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    {"   "}
                    {isCompleted ? "✅ Completed" : "⏳ Pending"}
                  </span>
                  <br />
                  <br />
                  <div style={{ fontSize: "14px", lineHeight: "1.4" }}>
                    <strong>Laps:</strong> {park.laps || "N/A"}
                    {"   "}
                    {"   "}
                    <strong>Avg time:</strong>{" "}
                    {formatTime(park.average_finish_time)}
                    <br />
                    <strong>Elevation gain:</strong>{" "}
                    {park.elevation_gain_m || "N/A"} m
                    <br />
                    <a
                      href={park.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View on Parkrun.org.uk
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <style jsx>{`
        .custom-marker {
          background: none !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}
