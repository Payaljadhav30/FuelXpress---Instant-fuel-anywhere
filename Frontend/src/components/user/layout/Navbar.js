import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";

function Navbar() {
  const user = AuthService.getCurrentUser();

  return (
    <div className="w-full h-[80px] px-10 flex items-center justify-between bg-black/30 backdrop-blur-sm shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
          F
        </div>
        <h2 className="text-white text-2xl font-semibold tracking-wide">
          FuelXpress
        </h2>
      </div>

      {/* Menu */}
      <div className="flex items-center gap-6 text-base">
        {user ? (
          <>
            <Link to="/user/order" className="text-white hover:text-orange-400 transition">
              Order
            </Link>
            <Link to="/user/orderHistory" className="text-white hover:text-orange-400 transition">
              History
            </Link>
            <Link to="/user/Profile" className="text-white hover:text-orange-400 transition">
              Profile
            </Link>
            <Link to="/user/logout" className="text-white hover:text-red-400 transition">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/user/auth/login" className="text-white hover:text-orange-400 transition">
              Login
            </Link>
            <Link to="/user/auth/register" className="text-white hover:text-orange-400 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
