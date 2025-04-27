import { Outlet, useLocation, useNavigate } from "react-router-dom";
import userImage from "../../../assets/images/userLogin.png"; 
import fuelStationImage from "../../../assets/images/sellerPicture.png"; 
import { useEffect, useState } from "react";
import authService from "../../../services/auth.service";

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();

  const isSeller = location.pathname.includes("/seller");

  const [] = useState("");
  const [] = useState("");
  const [] = useState(false);
  const [] = useState("");
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (user) {
      if (isSeller) {
        navigate("/seller/home"); 
      } else {
        navigate("/user/home"); 
      }
    }
  }, [user, isSeller, navigate]);

  return (
    <div className="min-h-screen bg-[#252422] flex flex-col lg:flex-row justify-evenly items-center">
      <div className="h-[25%] w-[30%]"> 
        <img 
          src={isSeller ? fuelStationImage : userImage} 
          alt="Auth" 
          className="object-contain w-full h-full"  
        />
      </div>
      <div className="text-white flex flex-col gap-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;








