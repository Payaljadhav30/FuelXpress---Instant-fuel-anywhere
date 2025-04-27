import { useNavigate } from "react-router-dom";
import GetStarted from "../../assets/images/getStarted.png";
import React from "react";

function Index() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-[#1A1A1A] flex justify-center items-center">
      <div className="relative w-full h-full">
        <img
          src={GetStarted}
          alt={"Get Started"}
          className="absolute top-0 left-0 w-full h-full object-cover blur-[5px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white flex flex-col gap-8">
          <div className="header">
          <h1 className="text-center text-[54px] font-bold whitespace-nowrap">
             Fuel at Your Fingertips
          </h1>

            <p className="text-lg">Quick fuel delivery, wherever you are.</p>
          </div>
          <div className="actions w-full flex flex-col gap-6 items-center">
  <button
    className="bg-[#D35400] hover:bg-[#E67E22] text-white font-bold py-2 px-10 rounded-full text-base min-w-[250px]"
    onClick={() => {
      navigate('user/auth/login');
    }}
  >
    <span className="font-extrabold">User</span>
  </button>
  <button
    className="bg-transparent border border-[#D35400] hover:bg-[#E67E22] text-white font-bold py-2 px-10 rounded-full text-base min-w-[250px]"
    onClick={() => {
      navigate('seller/auth/login');
    }}
  >
    <span className="font-extrabold">Seller</span>
  </button>
</div>

        </div>
      </div>
    </div>
  );
}

export default Index;