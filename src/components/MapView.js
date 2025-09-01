import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapViewParkList.css";

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

export default function MapView({ parks, completed }) {
  return (
    <div
      className="bg-blue-200 relative overflow-hidden"
      style={{ height: "70vh" }}
    >
      {/* Simple map visualization */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-200">
        <div className="absolute inset-4 bg-white/20 rounded-lg backdrop-blur-sm">
          <div className="p-4 text-center">
            <div className="text-lg font-bold text-gray-700 mb-2">
              Greater Manchester
            </div>
            <div className="text-sm text-gray-600">
              <MapContainer
                center={[53.4808, -2.2426]}
                zoom={11}
                className="map-container"
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
                      <Tooltip direction="top" offset={[0, -20]}>
                        <strong>{park.name}</strong>
                        <br />
                        {isCompleted ? "✅ Completed" : "❌ Not yet completed"}
                      </Tooltip>
                      <Popup>
                        <strong>
                          {park.name} {park.postcode}
                        </strong>
                        <br />
                        {isCompleted ? "✅ Completed" : "❌ Not yet completed"}
                        <br />
                        Laps: {park.laps || "N/A"}
                        <br />
                        Elevation gain: {park.elevation_gain_m || "N/A"} m<br />
                        Avg time: {formatTime(park.average_finish_time)}
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>

            {/* Mock map markers */}
            <div className="relative mt-4 h-40">
              {parks.slice(0, 8).map((park, index) => (
                <div
                  key={park.id}
                  className={`absolute w-3 h-3 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    completed.includes(park.id) ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{
                    left: `${20 + (index % 4) * 20}%`,
                    top: `${25 + Math.floor(index / 4) * 40}%`,
                  }}
                  title={park.name}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs bg-black/70 text-white px-1 rounded opacity-0 hover:opacity-100 whitespace-nowrap">
                    {park.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
