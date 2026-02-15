import LoginLight from "../../../assets/images/loginLight.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import ListOrder from "./ListOrder";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { toast } from "react-toastify";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countOnWayOrders, setCountOnWayOrders] = useState(0);
  const navigate = useNavigate();
  const fuelStation = AuthService.getCurrentFuelStation();

  // Redirect if no fuel station is logged in
  useEffect(() => {
    if (!fuelStation) navigate("/home");
  }, [fuelStation]);

  // Fetch orders
  const getOrders = async () => {
    try {
      const response = await AuthService.getOrders(fuelStation.stationId);
      setOrders(response.data);
      setLoading(false);
      const onWay = response.data.filter(
        (o) => !o.isCanceled.status && !o.isDelivered.status
      ).length;
      setCountOnWayOrders(onWay);

      if (response.data.length === 0) {
        toast.warning("There are no orders.");
        navigate("../");
      }
    } catch (err) {
      console.log(err.response || err);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (fuelStation) getOrders();
  }, [fuelStation]);

  const renderedOrders = orders
    .filter((o) => !o.isCanceled.status && !o.isDelivered.status)
    .map((o) => <ListOrder key={o._id} order={o} setLoading={setLoading} />);

  const renderedIcon = countOnWayOrders ? (
    <TbTruckDelivery className="text-green-400 text-4xl animate-bounce" />
  ) : (
    <AiOutlineShoppingCart className="text-white text-4xl" />
  );

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-start py-10 px-4 lg:px-16 gap-8"
      style={{
        backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${LoginLight})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 text-white text-center text-4xl lg:text-6xl font-bold">
        {renderedIcon}
        <h1>Orders</h1>
      </div>

      {/* Orders Container */}
      <div className="w-full lg:w-3/4 flex flex-col gap-6 overflow-auto">
        {loading ? (
          <p className="text-white text-center">Loading orders...</p>
        ) : renderedOrders.length > 0 ? (
          renderedOrders
        ) : (
          <p className="text-white text-center">No active orders available.</p>
        )}
      </div>
    </div>
  );
}

export default Order;
