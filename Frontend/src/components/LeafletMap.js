import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Marker from './map/Marker';

const ClickHandler = ({ setPointer }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (!isNaN(lat) && !isNaN(lng)) {
        setPointer({ lat, lng });
      }
    },
  });
  return null;
};

const SetMapView = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);

  return null;
};

const LeafletMap = ({ latitude, longitude, stationName, setPointer }) => {
  const [validLat, setValidLat] = useState(28.6139); // Delhi as default
  const [validLng, setValidLng] = useState(77.2090);

  useEffect(() => {
    if (typeof latitude === 'number' && typeof longitude === 'number' && !isNaN(latitude) && !isNaN(longitude)) {
      setValidLat(latitude);
      setValidLng(longitude);
    }
  }, [latitude, longitude]);

  return (
    <MapContainer
      center={[validLat, validLng]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {setPointer && <ClickHandler setPointer={setPointer} />}
      <SetMapView lat={validLat} lng={validLng} />

      <Marker
        lat={validLat}
        lng={validLng}
        markerId={stationName || 'Location'}
        popupText={stationName || 'Selected Location'}
        onClick={(e, position) => {
          console.log('Marker clicked at:', position);
        }}
      />
    </MapContainer>
  );
};

export default LeafletMap;
