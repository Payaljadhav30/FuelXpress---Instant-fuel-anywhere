import { useState } from "react";
import LeafletMap from "../LeafletMap"; 
function PreviewModal({ content, setOnCancel, setOnSubmit }) {
  const { location, name, quantity, distance } = content;

  const [pointer] = useState(location && location.lat && location.lng ? location : { lat: 20.9027, lng: 77.7584 });

  // Ensure that latitude and longitude are valid numbers
  const latitude = pointer?.lat ?? 20.9027;
  const longitude = pointer?.lng ?? 77.7584;

  return (
    <>
      <div className="h-screen justify-center flex lg:my-10 md:my-10 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full mx-auto max-w-3xl">
          {/* Content */}
          <div className="border-0 h-[100%] lg:h-[90%] md:h-[90%] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Body */}
            <div className="relative p-6 flex h-[100%] flex-col">
              <div className="h-2/3 flex justify-center items-center">
                {/* LeafletMap here */}
                <LeafletMap
                  latitude={latitude}  // Use valid latitude
                  longitude={longitude}  // Use valid longitude
                  stationName="Selected Location"
                />
              </div>
              <div className="w-full lg:md:2/3 flex flex-col gap-3">
                <h3 className="text-orange text-xl font-semibold text-black">{name}</h3>

                {/* Fuel and distance info */}
                <div className="text-grey-dark font-thin text-sm leading-normal text-black">
                  <p>
                    <strong>Petrol Rate:</strong> Rs: {quantity.petrol.price} <br />
                    <strong>Volume:</strong> {quantity.petrol.quantity} L
                  </p>
                  <p>
                    <strong>Diesel Rate:</strong> Rs: {quantity.diesel.price} <br />
                    <strong>Volume:</strong> {quantity.diesel.quantity} L
                  </p>
                  <p>
                    <strong>Distance:</strong> {distance} KM
                  </p>
                </div>
              </div>

              {/* Footer with buttons */}
              <div className="flex items-center flex-col w-full justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 w-full background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOnCancel(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOnSubmit(content._id)}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default PreviewModal;
