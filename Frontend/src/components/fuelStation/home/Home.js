import LoginLight from "../../../assets/images/loginLight.jpg";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { BsFuelPump } from "react-icons/bs";
import { useEffect, useState } from "react";
import SimpleMap from "../../map/Simple";

function Home() {
  const [pointer, setPointer] = useState(null);
  const [name, setName] = useState(null);
  const fuelStation = AuthService.getCurrentFuelStation();
  const navigate = useNavigate();

  const getResposne = async () => {
    try {
      const response = await AuthService.getFuelStationByID(fuelStation.stationId);
      setName(response.data.name);
      setPointer(response.data.location);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!fuelStation) navigate("/seller/auth/login");
    else getResposne();
  }, [fuelStation]);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center px-6 py-10"
      style={{
        backgroundImage: `linear-gradient(45deg,rgba(0,0,0, 0.75),rgba(0,0,0, 0.75)),url(${LoginLight})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col lg:flex-row w-full h-full max-w-7xl gap-10">
        {/* MAP SECTION */}
        <div className="flex justify-center items-center lg:w-1/2 w-full p-4">
          <div className="w-full h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shadow-lg">
            {pointer && (
              <SimpleMap pointer={pointer} setPointer={setPointer} disable={true} />
            )}
          </div>
        </div>

        {/* BUTTON SECTION */}
        <div className="flex flex-col justify-start items-center text-white w-full lg:w-1/2 gap-8">
          <div className="text-center text-[32px] lg:text-[48px] font-bold flex items-center gap-3">
            <BsFuelPump className="text-[#fe6f2b]" />
            <h1>{name}</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-md">
            <Link
              to="/seller/update-inventory"
              className="flex items-center justify-center h-[80px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
            >
              <h5 className="text-xl font-bold text-white">Update Fuel</h5>
            </Link>

            <Link
              to="/seller/order"
              className="flex items-center justify-center h-[80px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
            >
              <h5 className="text-xl font-bold text-white">Order Fuel</h5>
            </Link>

            <Link
              to="/seller/orderHistory"
              className="flex items-center justify-center h-[80px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
            >
              <h5 className="text-xl font-bold text-white">Order History</h5>
            </Link>

            <Link
              to="/seller/Profile"
              className="flex items-center justify-center h-[80px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
            >
              <h5 className="text-xl font-bold text-white">Profile</h5>
            </Link>

            <Link
              to="/seller/logout"
              className="flex items-center justify-center h-[80px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
            >
              <h5 className="text-xl font-bold text-white">Log Out</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
