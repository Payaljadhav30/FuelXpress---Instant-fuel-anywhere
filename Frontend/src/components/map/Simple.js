import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Marker from "./Marker";

// Helper to center map on load/update
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center?.lat && center?.lng) {
      map.setView([center.lat, center.lng], map.getZoom());
    }
  }, [center, map]);
  return null;
}

function SimpleMap({ pointer, setPointer, disable, userLocation, stations }) {
  const defaultCenter =
    pointer && pointer.lat && pointer.lng
      ? { lat: pointer.lat, lng: pointer.lng }
      : { lat: 0, lng: 0 };

  const stationList = Array.isArray(stations) ? stations : [];

  return (
    <MapContainer
      center={[defaultCenter.lat, defaultCenter.lng]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <RecenterMap center={defaultCenter} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {/* User Location Marker */}
      {userLocation?.lat && userLocation?.lng && (
        <Marker
          lat={userLocation.lat}
          lng={userLocation.lng}
          markerId="user-location"
          popupText="Your Location"
          color="blue"
          onClick={() => {}}
        />
      )}

      {/* If showing a list of stations */}
      {stationList.length > 0 &&
        stationList.map((station, index) => {
          const { location, name } = station;
          if (
            !location ||
            typeof location.lat !== "number" ||
            typeof location.lng !== "number"
          )
            return null;

          return (
            <Marker
              key={index}
              lat={location.lat}
              lng={location.lng}
              markerId={name}
              popupText={`Station: ${name}`}
              onClick={() => {
                if (!disable && setPointer) {
                  setPointer({ lat: location.lat, lng: location.lng });
                }
              }}
            />
          );
        })}

      {/* If no station list but still showing a specific location (like in modal) */}
      {stationList.length === 0 &&
        pointer?.lat &&
        pointer?.lng && (
          <Marker
            lat={pointer.lat}
            lng={pointer.lng}
            markerId="station"
            popupText="Station Location"
            onClick={() => {}}
          />
        )}
    </MapContainer>
  );
}

export default SimpleMap;
