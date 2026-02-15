import LoginLight from "../../../assets/images/loginLight.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import ListOrderHistory from "./ListOrderHistory";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (!user) navigate("/home");
  }, [user, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await AuthService.getUserOrders(user.userId);
        setOrders(response.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${LoginLight})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-3xl h-[80vh] overflow-y-auto py-4">
        <h1 className="text-white text-4xl font-bold mb-4 text-center">Past Orders</h1>

        {loading ? (
          <p className="text-white text-center py-4">Loading...</p>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <ListOrderHistory key={order._id} order={order} setLoading={setLoading} />
          ))
        ) : (
          <p className="text-white text-center py-4 text-lg">No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
