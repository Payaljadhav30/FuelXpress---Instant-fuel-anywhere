import { Outlet, useLocation, useNavigate } from "react-router-dom";
import userImage from "../../../assets/images/userLogin.png"; 
import fuelStationImage from "../../../assets/images/sellerPicture.png"; 
import { useEffect } from "react";
import authService from "../../../services/auth.service";

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSeller = location.pathname.includes("/seller");
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (user) {
      navigate(isSeller ? "/seller/home" : "/user/home");
    }
  }, [user, isSeller, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row justify-center items-center p-6 lg:p-12 gap-8">

      {/* Left Image Panel */}
      <div className="h-[200px] w-[200px] lg:h-[300px] lg:w-[300px]">
        <img 
          src={isSeller ? fuelStationImage : userImage} 
          alt="Auth" 
          className="object-contain w-full h-full rounded-xl shadow-xl"  
        />
      </div>

      {/* Right Form Panel */}
      <div className="text-white flex flex-col gap-6 w-full max-w-sm">
        <div className="bg-gray-800 p-5 lg:p-6 rounded-xl shadow-md">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default Auth;






