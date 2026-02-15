import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/auth.service";
import OrderPreview from "../../modal/OrderPreview";
import { toast } from "react-toastify";

function ListOrder({ order, setLoading }) {
  const { fuel, isAccepted, isCanceled, isDelivered, method, userId, _id } = order;
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await authService.getUserInfo(userId);
      setUserInfo(response.data);
    } catch (err) {
      console.log(err.response || err);
    }
  };

  const handleAction = async (actionFn, successToast) => {
    try {
      const response = await actionFn(_id);
      toast[successToast](response.data.message);
      setLoading(true);
      setShowModal(false);
    } catch (err) {
      console.log(err.response || err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const statusLabel = () => {
    if (isCanceled.status) return "Canceled";
    if (isDelivered.status) return "Delivered";
    if (isAccepted.status && !isDelivered.status) return "On The Way";
    return "Pending";
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 m-4 w-full max-w-xl mx-auto flex flex-col gap-4">
      {/* User Info */}
      {userInfo && (
        <div className="text-white text-sm">
          <p className="font-semibold">Name: <span className="font-normal">{userInfo.name}</span></p>
          <p className="font-semibold">Mobile: <span className="font-normal">{userInfo.phone}</span></p>
        </div>
      )}

      {/* Order Info */}
      <div className="text-white text-sm">
        {fuel.petrol && (
          <p>
            <span className="font-semibold">Petrol:</span> {fuel.petrol.price} ₹/L (Qty: {fuel.petrol.quantity} L)
          </p>
        )}
        {fuel.diesel && (
          <p>
            <span className="font-semibold">Diesel:</span> {fuel.diesel.price} ₹/L (Qty: {fuel.diesel.quantity} L)
          </p>
        )}
        <p>
          <span className="font-semibold">Cost:</span> {method?.cash ?? method?.online?.amount ?? "N/A"} ₹
        </p>
        <p className={`font-bold mt-2 text-sm ${isCanceled.status ? "text-red-600" : "text-green-500"}`}>
          Status: {statusLabel()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex-1 py-2 px-4 border border-[#fe6f2b] hover:bg-[#fe6f2b] hover:text-white rounded font-bold text-white transition-colors"
        >
          View
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <OrderPreview
          order={order}
          userInfo={userInfo}
          setOnClose={() => setShowModal(false)}
          setOnDelivery={() => handleAction(authService.deliveryOrder, "success")}
          setOnCancel={() => handleAction(authService.cancelOrder, "error")}
          setOnApply={() => handleAction(authService.acceptOrder, "info")}
        />
      )}
    </div>
  );
}

export default ListOrder;
