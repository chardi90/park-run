import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icons
const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapView({ parks, completed }) {
  return (
    <MapContainer
      center={[53.4808, -2.2426]}
      zoom={11}
      style={{ height: "100vh", width: "100%" }}
    >
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
            icon={isCompleted ? greenIcon : redIcon}
          >
            {/* Tooltip shows on hover */}
            <Tooltip
              direction="top"
              offset={[0, -30]}
              opacity={1}
              permanent={false}
            >
              <span>
                {park.name} {isCompleted ? "✅" : "❌"}
              </span>
            </Tooltip>

            {/* Popup shows on click */}
            <Popup>
              <b>{park.name}</b>
              <br />
              {isCompleted ? "✅ Completed" : "❌ Not yet completed"}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
