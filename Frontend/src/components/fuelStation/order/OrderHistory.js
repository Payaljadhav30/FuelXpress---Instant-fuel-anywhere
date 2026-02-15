import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-toastify";

import LoginLight from "../../../assets/images/loginLight.jpg";
import AuthService from "../../../services/auth.service";
import ListOrderHistory from "./ListOrderHistory";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  // Redirect to home if user not logged in
  useEffect(() => {
    if (!user) {
      navigate("/home");
    }
  }, [user, navigate]);

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await AuthService.getUserOrders(user.userId);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  // Filter past orders (delivered or canceled)
  const pastOrders = orders.filter(
    (order) => order.isDelivered?.status || order.isCanceled?.status
  );

  // Notify if no past orders
  useEffect(() => {
    if (!loading && pastOrders.length === 0) {
      toast.warning("No past orders found");
    }
  }, [loading, pastOrders]);

  return (
    <div
      className="w-screen h-screen flex flex-col items-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0.75), rgba(0,0,0,0.75)), url(${LoginLight})`,
      }}
    >
      {/* Page Title */}
      <div className="text-white mt-8 mb-4 flex items-center gap-3 text-4xl lg:text-6xl font-sans">
        <AiOutlineShoppingCart className="text-white" />
        <h1>Past Orders</h1>
      </div>

      {/* Orders List */}
      <div className="w-full max-w-3xl max-h-[75vh] overflow-y-auto flex flex-col gap-3 px-4 py-2">
        {loading ? (
          <p className="text-white text-lg text-center">Loading orders...</p>
        ) : pastOrders.length > 0 ? (
          pastOrders.map((order) => (
            <ListOrderHistory
              key={order._id}
              order={order}
              setLoading={setLoading}
            />
          ))
        ) : (
          <p className="text-white text-lg text-center">
            No past orders to display.
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
