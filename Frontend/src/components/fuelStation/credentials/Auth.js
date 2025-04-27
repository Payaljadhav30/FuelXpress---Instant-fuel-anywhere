import { Outlet, useNavigate } from "react-router-dom";
import authImage from "../../../assets/images/sellerPicture.png";
import { useEffect, useState } from "react";

import authService from "../../../services/auth.service";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState("");
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  bg-[#252422] flex flex-col lg:flex-row justify-evenly items-center">
      <div className="h-[45%]">
        <img src={authImage} alt={"Auth Image"} />
      </div>
      <div className="text-white flex flex-col gap-10">
        <Outlet/>
      </div>
    </div>
  );
}
export default Auth;
