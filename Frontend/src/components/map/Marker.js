import { func, number, oneOfType, string } from 'prop-types';
import L from 'leaflet';  // Leaflet library
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';  
import markerPin from '../../assets/images/marker-pin.png'; 

const Marker = ({ className, lat, lng, markerId, popupText, onClick, ...props }) => {
  const markerRef = useRef(null);
  const map = useMap();  // Get the map instance

  useEffect(() => {
    const icon = new L.Icon({
      iconUrl: markerPin,  
      iconSize: [32, 32],  
      iconAnchor: [16, 32], // Anchor position for the icon
      popupAnchor: [0, -32], // Popup position
    });

    const leafletMarker = L.marker([lat, lng], {
      icon,
    });

    leafletMarker.on('click', (e) => {
      if (onClick) {
        onClick(e, { lat, lng });
      }
    });

    // Bind the popup to show when marker is clicked
    if (popupText) {
      leafletMarker.bindPopup(popupText); // Shows the popup with the station name
    }

    // Add the marker to the map
    if (map) {
      leafletMarker.addTo(map);  // Use the map instance obtained from the hook
    }

    return () => {
      leafletMarker.remove();
    };
  }, [lat, lng, onClick, popupText, map]);  
  return <div ref={markerRef} {...props} className={className} />;
};

Marker.defaultProps = {
  className: '',
  onClick: null,
  popupText: '',
};

Marker.propTypes = {
  className: string,
  markerId: oneOfType([number, string]).isRequired,
  lat: number.isRequired,
  lng: number.isRequired,
  popupText: string,
  onClick: func,
};

export default Marker;
