import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapViewParkList.css";

function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize(); // force Leaflet to recalc
  }, [map]);
  return null;
}

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
    <div className="Map-view">
      <MapContainer
        center={[53.4808, -2.2426]}
        zoom={11}
        className="map-container"
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
  );
}
