import { useState, useEffect } from "react";
import ListStation from "./ListStation";
import LoginLight from "../../../assets/images/loginLight.jpg";
import SimpleMap from "../../map/Simple";
import AuthService from "../../../services/auth.service";
import { getDistance } from "geolib";

function Order() {
  const [pointer, setPointer] = useState(null); // Map center
  const [userLocation, setUserLocation] = useState(null); // Real user location
  const [stations, setStations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationLoaded, setLocationLoaded] = useState(false);

  const getResponse = async () => {
    try {
      const response = await AuthService.getFuelStation();
      if (response.data && response.data.stations) {
        setStations(response.data.stations);
      } else {
        setErrorMessage("No stations available.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error fetching stations.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(loc);
          setPointer(loc); // center map on user's location initially
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
    getResponse();
  }, []);

  const handleStationClick = (station) => {
    setPointer({
      lat: station.location.lat,
      lng: station.location.lng,
    });
  };

  const renderedStations = stations.length
    ? stations.map((station) => {
        const validLocation =
          station.location && station.location.lat && station.location.lng;
        if (!validLocation || !userLocation) return null;

        const distance = parseInt(
          getDistance(
            { latitude: station.location.lat, longitude: station.location.lng },
            { latitude: userLocation.lat, longitude: userLocation.lng }
          ) / 1000
        );

        return (
          <div
            key={station._id}
            className="w-full mb-4"
            onClick={() => handleStationClick(station)}
          >
            <ListStation station={{ ...station, distance }} />
          </div>
        );
      })
    : null;

  return (
    <div
      className="w-screen min-h-screen flex flex-col lg:flex-row"
      style={{
        backgroundImage: `linear-gradient(45deg,rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(${LoginLight})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}
    >
      {/* Left section - station list */}
      <div className="w-full lg:w-1/2 p-6 overflow-y-auto h-[50vh] lg:h-screen">
        <h1 className="text-4xl mb-4 font-bold text-center">Available Stations</h1>
        {errorMessage ? (
          <p className="text-red-400">{errorMessage}</p>
        ) : (
          renderedStations
        )}
      </div>

      {/* Right section - map */}
      {!isModalOpen && locationLoaded && pointer && (
        <div className="w-full h-96 mt-6">
          <SimpleMap
            pointer={pointer}
            setPointer={setPointer}
            disable={true}
            stations={stations}
            userLocation={userLocation} // ✅ Now separate from pointer
          />
        </div>
      )}
    </div>
  );
}

export default Order;

















