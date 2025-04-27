import { useState } from "react";
import SimpleMap from "../../map/Simple";
import PreviewModal from "../../modal/PreviewModal";
import { useNavigate } from "react-router-dom";

function ListStation({ station }) {
  const { location, name, quantity, distance } = station;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Validate location object
  const validLocation = location && location.lat && location.lng;

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="shadow-lg gap-3 rounded m-8 p-8 flex bg-gray-800">
      <div className="w-full lg: md:2/3 flex flex-col gap-3">
        <h3 className="text-orange text-xl font-semibold text-white">{name}</h3>

        <p className="text-grey-dark font-thin text-sm leading-normal text-white">
          Fuel Rate : Rs : {quantity.petrol.price}
          <br />
          Volume : {quantity.petrol.quantity / quantity.petrol.quantity} ltr

        </p>
        <p className="text-grey-dark font-thin text-sm leading-normal text-white">
          Fuel Rate : Rs : {quantity.diesel.price}
          <br />
          Volume : {quantity.diesel.quantity / quantity.diesel.quantity} ltr
        </p>
        <p className="text-grey-dark font-thin text-sm leading-normal text-white">
          Distance : {distance} KM
        </p>

        {/* Display map with station location */}
        <div className="w-full h-64 my-4">
          {/* Ensure the location is valid before rendering the map */}
          {validLocation ? (
            <SimpleMap pointer={location} setPointer={() => {}} disable={true} />
          ) : (
            <p className="text-center text-gray-500">Invalid location data</p>
          )}
        </div>

        <button
          className="bg-transparent hover:bg-[#fe6f2b] border-[#fe6f2b] font-bold text-white py-1 border hover:border-transparent rounded"
          onClick={() => {
            setShowModal(true);
          }}
        >
          View
        </button>

        {/* Modal for booking details */}
        {showModal ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[9999]">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg text-black overflow-y-auto h-[85vh]">
              {/* Modal container with larger height and scrollable content */}
              <div className="space-y-4">
                {/* Fixed map size at the top */}
                <div className="w-full h-96">
                  {validLocation ? (
                    <SimpleMap pointer={location} setPointer={() => {}} disable={true} />
                  ) : (
                    <p className="text-center text-gray-500">Invalid location data</p>
                  )}
                </div>

                {/* Scrollable content area for station info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{name}</h3>
                  <p>Fuel Rate (Petrol): ₹{quantity.petrol.price} — {quantity.petrol.quantity / quantity.petrol.quantity} L</p>
                  <p>Fuel Rate (Diesel): ₹{quantity.diesel.price} — {quantity.diesel.quantity/ quantity.diesel.quantity} L</p>
                  <p>Distance: {distance} KM</p>
                </div>

                {/* Cancel and Order buttons */}
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                    onClick={() => {
                      navigate(`/user/bookOrder/${station._id}`);
                      closeModal();
                    }}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ListStation;
