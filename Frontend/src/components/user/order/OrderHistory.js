import LoginLight from "../../../assets/images/loginLight.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import ListOrderHistory from "./ListOrderHistory";

function OrderHistory() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate("/home");
    }
  }, [user]);

  // Fetching orders
  const getOrders = async () => {
    try {
      await AuthService.getUserOrders(user.userId).then(
        (response) => {
          setOrders(response.data);
          setLoading(false);
        },
        (error) => {
          console.log(error.response.data.message);
          setLoading(false);
        }
      );
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const renderedOrders =
    orders && orders.length > 0 ? (
      orders.map((element) => (
        <ListOrderHistory
          order={element}
          setLoading={setLoading}
          key={element._id}
        />
      ))
    ) : (
      <p className="text-white text-lg text-center">No orders found.</p>
    );

  return (
    <div
      className="w-screen h-screen flex flex-col justify-around items-center lg:md:flex-row"
      style={{
        backgroundImage: `linear-gradient(45deg, rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url(${LoginLight})`,
        backgroundPosition: `50% 50%`,
        backgroundSize: `cover`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-white p-3 text-center text-[54px] flex flex-row justify-center items-center gap-3 whitespace-break-spaces font-sans lg:text-[96px] md:text-[74px]">
        <h1>Past Orders</h1>
      </div>

      <div className="w-[100%] h-[100%] justify-center lg:w-[50%] items-center flex flex-col flex-wrap overflow-scroll">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          renderedOrders
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
