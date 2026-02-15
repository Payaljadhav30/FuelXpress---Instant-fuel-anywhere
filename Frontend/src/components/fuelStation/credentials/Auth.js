
import { Outlet } from "react-router-dom";
import authImage from "../../../assets/images/sellerPicture.png";

function Auth() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12">
      
      {/* Left Image Panel */}
      <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
        <img
          src={authImage}
          alt="Authentication Illustration"
          className="max-w-full h-auto rounded-2xl shadow-2xl"
        />
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300 text-sm lg:text-base">
            Please login to your seller account
          </p>
        </div>

        <div className="bg-gray-800 p-6 lg:p-8 rounded-2xl shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Auth;

