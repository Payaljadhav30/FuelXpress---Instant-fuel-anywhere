import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleMap from "../../map/Simple";

function ListStation({ station }) {
  const { location, name, quantity = {}, distance } = station;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const petrol = quantity.petrol || {};
  const diesel = quantity.diesel || {};

  const validLocation = location && location.lat && location.lng;

  const closeModal = () => setShowModal(false);

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col gap-3">
        <h3 className="text-orange-400 text-lg font-semibold">{name}</h3>

        <div className="flex justify-between text-gray-200 text-sm">
          <span>Petrol:</span>
          <span>
            {petrol.price != null ? `₹${petrol.price}/ltr` : "N/A"} — {petrol.quantity ?? 0} L
          </span>
        </div>

        <div className="flex justify-between text-gray-200 text-sm">
          <span>Diesel:</span>
          <span>
            {diesel.price != null ? `₹${diesel.price}/ltr` : "N/A"} — {diesel.quantity ?? 0} L
          </span>
        </div>

        <div className="flex justify-between text-gray-200 text-sm">
          <span>Distance:</span>
          <span>{distance ?? "N/A"} KM</span>
        </div>

        <button
          className="mt-4 bg-transparent border border-orange-400 text-orange-400 font-semibold py-2 rounded hover:bg-orange-400 hover:text-white transition-colors duration-300"
          onClick={() => setShowModal(true)}
        >
          View Details
        </button>

        {/* Modal with Map */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[9999]">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg text-black overflow-y-auto max-h-[85vh]">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{name}</h3>

                <div className="flex justify-between text-gray-700 text-sm">
                  <span>Petrol:</span>
                  <span>
                    {petrol.price != null ? `₹${petrol.price}/ltr` : "N/A"} — {petrol.quantity ?? 0} L
                  </span>
                </div>

                <div className="flex justify-between text-gray-700 text-sm">
                  <span>Diesel:</span>
                  <span>
                    {diesel.price != null ? `₹${diesel.price}/ltr` : "N/A"} — {diesel.quantity ?? 0} L
                  </span>
                </div>

                <div className="flex justify-between text-gray-700 text-sm">
                  <span>Distance:</span>
                  <span>{distance ?? "N/A"} KM</span>
                </div>

                {/* Map inside modal */}
                {validLocation ? (
                  <div className="w-full h-64 mt-4 rounded-lg overflow-hidden">
                    <SimpleMap pointer={location} setPointer={() => {}} disable={true} />
                  </div>
                ) : (
                  <p className="text-center text-gray-500 mt-4">Location data unavailable</p>
                )}

                <div className="mt-6 flex justify-end gap-4">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300"
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
        )}
      </div>
    </div>
  );
}

export default ListStation;
