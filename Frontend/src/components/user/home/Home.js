import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "../../../services/auth.service";
import SimpleMap from "../../map/Simple";
import LoginLight from "../../../assets/images/loginLight.jpg";

function Home() {
  const [name, setName] = useState("");
  const [pointer, setPointer] = useState({});
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/user/auth/login");
  }, [user, navigate]);

  // Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setPointer({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // Fetch user
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await AuthService.getUserInfo(user.userId);
        setName(response.data.name);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) getUserInfo();
  }, [user]);

  return (
    <div
      className="w-screen min-h-screen flex flex-col"
      style={{
        backgroundImage: `linear-gradient(45deg,rgba(0,0,0,0.80),rgba(0,0,0,0.80)),url(${LoginLight})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* ------------------ HERO SECTION ------------------ */}
      <div className="flex flex-col lg:flex-row w-full px-10 py-8 items-center justify-center gap-10">

        {/* Left Content */}
        <div className="w-full lg:w-[45%] text-white space-y-4">
          <h1 className="text-3xl font-bold leading-tight">
            Hey {name.split(" ")[0]},
            <br />
            Let's Fuel Up!
          </h1>

          <p className="text-sm opacity-90 max-w-[90%]">
            Quick, safe and easy doorstep fuel delivery — stop waiting in lines and save your time.
          </p>

          {/* Bigger Order Button */}
          <Link
            to="/user/order"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg 
                       text-white text-base font-semibold shadow-lg inline-block transition"
          >
            ⛽ Order Fuel Now
          </Link>
        </div>

        {/* Map */}
        <div className="w-full lg:w-[35%] flex flex-col items-center">
          <div className="w-full h-[230px] rounded-lg overflow-hidden shadow-md border border-gray-700">
            {pointer?.lat && pointer?.lng && (
              <SimpleMap pointer={pointer} setPointer={setPointer} disable={true} />
            )}
          </div>

          {/* Map Description Line */}
          <p className="text-gray-300 text-xs mt-2 text-center">
            This map shows your live location so delivery reaches you accurately.
          </p>
        </div>

      </div>

      {/* ------------------ FEATURES SECTION ------------------ */}
      <div className="w-full mt-4 py-5 px-10">
        <h2 className="text-white text-xl font-semibold text-center mb-5">
          Why Choose FuelXpress?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg text-white text-center shadow-md">
            <h3 className="text-md font-semibold mb-1">⚡ Instant Delivery</h3>
            <p className="text-xs opacity-80">Fuel comes to your location fast.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg text-white text-center shadow-md">
            <h3 className="text-md font-semibold mb-1">🛡️ Safe & Certified</h3>
            <p className="text-xs opacity-80">Handled following strict safety rules.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg text-white text-center shadow-md">
            <h3 className="text-md font-semibold mb-1">📍 Accurate Live Tracking</h3>
            <p className="text-xs opacity-80">Track your delivery in real time.</p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Home;
