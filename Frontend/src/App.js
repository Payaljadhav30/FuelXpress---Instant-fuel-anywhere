import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/user/login/Login";
import Register from "./components/user/register/Register";
import SimpleMap from "./components/map/Simple";
import Home from "./components/user/home/Home";
import Order from "./components/user/order/Order";
import BookOrder from "./components/user/order/BookOrder";
import Profile from "./components/user/Profile/UpdateProfile";
import FuelHome from "./components/fuelStation/home/Home";
import FuelOrder from "./components/fuelStation/order/Order";
import FuelOrderHistory from "./components/fuelStation/order/OrderHistory";
import UpdateProfile from "./components/fuelStation/Profile/UpdateProfile";
import GetStarted from "./components/getStarted/Index";
import Auth from "./components/user/credentials/Auth";
import FuelLogin from "./components/fuelStation/login/Login";
import FuelRegister from "./components/fuelStation/register/Register";
import UpdateFuel from "./components/fuelStation/inventory/UpdateFuel";
import OrderHistory from "./components/user/order/OrderHistory";
import { toast } from "react-toastify";
import { useEffect } from "react";
import 'leaflet/dist/leaflet.css';

const LogoutUser = () => {
  const navigate = useNavigate();
  localStorage.removeItem("user"); 
  localStorage.removeItem("fuelStation"); 
  toast.success("Logged Out");
  useEffect(() => {
    navigate("/user/auth/login"); 
  }, [navigate]);
};

const LogoutSeller = () => {
  const navigate = useNavigate();
  localStorage.removeItem("fuelStation"); 
  localStorage.removeItem("user"); 
  toast.success("Logged Out");
  useEffect(() => {
    navigate("/seller/auth/login"); 
  }, [navigate]);
};

function App() {
  return (
    <Routes>
      {/* Get Started Page */}
      <Route path="/" element={<GetStarted />} />
      
      {/* User Routes */}
      <Route path="user">
        <Route path="auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="logout" element={<LogoutUser />} />
        <Route path="" element={<Home />} />
        <Route path="order" element={<Order />} />
        <Route path="bookOrder/:id" element={<BookOrder />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="orderHistory" element={<OrderHistory />} />
      </Route>

      {/* Seller Routes */}
      <Route path="seller">
        <Route path="auth" element={<Auth />}>
          <Route path="register" element={<FuelRegister />} />
          <Route path="login" element={<FuelLogin />} />
        </Route>
        <Route path="logout" element={<LogoutSeller />} />
        <Route path="" element={<FuelHome />} />
        <Route path="order" element={<FuelOrder />} />
        <Route path="orderHistory" element={<FuelOrderHistory />} />
        <Route path="profile" element={<UpdateProfile />} />
        <Route path="update-inventory" element={<UpdateFuel />} />
      </Route>

      {/* Map Route */}
      <Route path="map" element={<SimpleMap lat={12.2} lng={23.4} />} />
    </Routes>
  );
}

export default App;
