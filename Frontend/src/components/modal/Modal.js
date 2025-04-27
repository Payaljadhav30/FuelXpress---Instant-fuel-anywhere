import { useState, useEffect } from "react";
import LeafletMap from "../LeafletMap";

function Modal({ setOnCancel, setOnSubmit }) {
  const [pointer, setPointer] = useState({ lat: 28.6139, lng: 77.2090 }); // Default to Delhi
  const [userLocation, setUserLocation] = useState(null);

  // Get the user's current location using geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setPointer({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting geolocation", error);
          // Optionally inform the user of the error
          setUserLocation({ lat: 28.6139, lng: 77.2090 }); // Fallback to Delhi
        }
      );
    }
  }, []);

  const handleSubmit = () => {
    if (!pointer || isNaN(pointer.lat) || isNaN(pointer.lng)) {
      alert("Please select a valid location on the map.");
      return;
    }
    setOnSubmit(pointer); // Pass selected pointer back to parent
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full mx-auto max-w-3xl">
          <div className="border-0 h-[90vh] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-4 flex-auto h-full">
              {/* Pass the user location as initialLocation */}
              <LeafletMap
                latitude={pointer.lat}
                longitude={pointer.lng}
                stationName="Selected Location"
                setPointer={setPointer}
                initialLocation={userLocation} // Pass user's location as initial location
              />
            </div>

            <div className="flex items-center justify-between p-4 border-t border-gray-200 rounded-b">
              <button
                className="text-red-500 font-bold uppercase text-sm px-4 py-2 hover:text-red-700"
                type="button"
                onClick={() => setOnCancel(false)} // Close the modal
              >
                Cancel
              </button>
              <button
                className="bg-emerald-500 text-white font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-md transition-all"
                type="button"
                onClick={handleSubmit} // Set the location
              >
                Set Location
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
}

export default Modal;
