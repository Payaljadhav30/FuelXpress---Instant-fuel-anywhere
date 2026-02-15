import { useEffect, useState } from "react";
import authService from "../../../services/auth.service";
import OrderPreview from "../../modal/OrderPreview";

function ListOrderHistory({ order, setLoading }) {
  const { fuel, isAccepted, isCanceled, isDelivered, method, userId, _id } = order;
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch user info (optional for user side; can remove if unnecessary)
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await authService.getUserInfo(userId);
        setUserInfo(response.data);
      } catch (err) {
        console.log(err.response || err);
      }
    };
    getUserInfo();
  }, [userId]);

  const handleAction = async (actionFn) => {
    try {
      const response = await actionFn(_id);
      alert(response.data.message);
      setLoading(true);
      setShowModal(false);
    } catch (err) {
      console.log(err.response || err);
    }
  };

  // Determine status label
  const statusLabel = () => {
    if (isCanceled.status) return { text: "Canceled", color: "text-red-500" };
    if (isDelivered.status) return { text: "Delivered", color: "text-green-500" };
    if (isAccepted.status && !isDelivered.status) return { text: "On The Way", color: "text-green-400" };
    return { text: "Pending", color: "text-yellow-400" };
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-xl mx-auto flex flex-col gap-2">
      
      {/* Fuel Info */}
      <div className="text-white text-sm">
        {fuel.petrol && (
          <p>
            <span className="font-semibold">Petrol:</span> {fuel.petrol.price} ₹/L — {fuel.petrol.quantity} L
          </p>
        )}
        {fuel.diesel && (
          <p>
            <span className="font-semibold">Diesel:</span> {fuel.diesel.price} ₹/L — {fuel.diesel.quantity} L
          </p>
        )}
        <p>
          <span className="font-semibold">Total Cost:</span> {method?.cash ?? method?.online?.amount ?? "N/A"} ₹
        </p>
        <p className={`font-bold mt-1 ${statusLabel().color}`}>Status: {statusLabel().text}</p>
      </div>

      {/* Action Button */}
      <div className="flex justify-end mt-2">
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1 border border-orange-500 rounded text-white font-semibold hover:bg-orange-500 transition"
        >
          View
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <OrderPreview
          order={order}
          disable={true}
          userInfo={userInfo}
          setOnClose={() => setShowModal(false)}
          setOnDelivery={() => handleAction(authService.deliveryOrder)}
          setOnCancel={() => handleAction(authService.cancelOrder)}
          setOnApply={() => handleAction(authService.acceptOrder)}
        />
      )}
    </div>
  );
}

export default ListOrderHistory;
