import { useState, useEffect } from "react";
import ListStation from "./ListStation";
import LoginLight from "../../../assets/images/loginLight.jpg";
import AuthService from "../../../services/auth.service";
import { getDistance } from "geolib";

function Order() {
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]); // Default to empty array
  const [errorMessage, setErrorMessage] = useState("");
  const [locationLoaded, setLocationLoaded] = useState(false);

  const fetchStations = async () => {
    try {
      const response = await AuthService.getFuelStation();
      if (response.data && response.data.stations) {
        setStations(response.data.stations);
      } else {
        setStations([]);
        setErrorMessage("No stations available.");
      }
    } catch (error) {
      console.error(error);
      setStations([]);
      setErrorMessage("Error fetching stations.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationLoaded(true);
        },
        () => {
          setErrorMessage("Unable to retrieve your location.");
          setLocationLoaded(true);
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by your browser.");
      setLocationLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchStations();
  }, []);

  const renderedStations =
    Array.isArray(stations) && userLocation
      ? stations.map((station) => {
          const validLocation =
            station.location && station.location.lat && station.location.lng;
          if (!validLocation) return null;

          const distance = parseInt(
            getDistance(
              { latitude: station.location.lat, longitude: station.location.lng },
              { latitude: userLocation.lat, longitude: userLocation.lng }
            ) / 1000
          );

          return (
            <div key={station._id} className="mb-6">
              <ListStation station={{ ...station, distance }} />
            </div>
          );
        })
      : null;

  return (
    <div
      className="w-screen min-h-screen flex flex-col items-center p-6"
      style={{
        backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${LoginLight})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}
    >
      <h1 className="text-3xl lg:text-4xl font-semibold text-center mb-6 text-shadow-md">
        Fuel Stations Near You
      </h1>

      {errorMessage && (
        <p className="text-red-400 text-center mb-6">{errorMessage}</p>
      )}

      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderedStations && renderedStations.length > 0 ? (
          renderedStations
        ) : (
          <p className="text-center col-span-full text-gray-200">
            {errorMessage ? errorMessage : "Loading stations..."}
          </p>
        )}
      </div>
    </div>
  );
}

export default Order;















