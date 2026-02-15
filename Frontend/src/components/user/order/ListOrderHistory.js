import { useEffect, useState } from "react";
import authService from "../../../services/auth.service";
import OrderPreview from "../../modal/OrderPreview";

function ListOrderHistory({ order, setLoading }) {
  const { fuel, isAccepted, isCanceled, isDelivered, method, userId, _id } = order;

  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await authService.getUserInfo(userId);
        setUserInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserInfo();
  }, [userId]);

  const handleAction = async (actionFn) => {
    try {
      const response = await actionFn(_id);
      alert(response.data.message);
      setLoading(true);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const renderStatus = () => {
    if (isCanceled?.status)
      return <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">Canceled</span>;
    if (isDelivered?.status)
      return <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">Delivered</span>;
    if (isAccepted?.status && !isDelivered?.status)
      return <span className="bg-green-400 text-white px-3 py-1 rounded text-sm font-bold">On The Way</span>;
    return <span className="bg-yellow-400 text-white px-3 py-1 rounded text-sm font-bold">Pending</span>;
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-md h-[32vh] p-4 flex flex-col justify-between hover:shadow-xl transition duration-300">
      
      {/* Top: User Info */}
      {userInfo && (
        <div className="flex flex-col text-sm text-gray-300 gap-1">
          <span><strong>Name:</strong> {userInfo.name}</span>
          <span><strong>Mobile:</strong> {userInfo.phone}</span>
          <span><strong>Email:</strong> {userInfo.email}</span>
        </div>
      )}

      {/* Middle: Fuel & Cost */}
      <div className="flex flex-col gap-1 text-sm text-gray-300 mt-2">
        {fuel?.petrol && <span>Petrol: ₹{fuel.petrol.price} — {fuel.petrol.quantity} L</span>}
        {fuel?.diesel && <span>Diesel: ₹{fuel.diesel.price} — {fuel.diesel.quantity} L</span>}
        <span>Cost: ₹{method?.cash ?? method?.online?.amount ?? "N/A"}</span>
      </div>

      {/* Status */}
      <div className="mt-2">{renderStatus()}</div>

      {/* Bottom: View Button */}
      <div className="flex justify-center mt-2">
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1 rounded transition duration-200"
          onClick={() => setShowModal(true)}
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
          setOnClose={setShowModal}
          setOnDelivery={() => handleAction(authService.deliveryOrder)}
          setOnCancel={() => handleAction(authService.cancelOrder)}
          setOnApply={() => handleAction(authService.acceptOrder)}
        />
      )}
    </div>
  );
}

export default ListOrderHistory;
