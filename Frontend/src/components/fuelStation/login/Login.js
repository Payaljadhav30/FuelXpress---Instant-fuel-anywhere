// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import authService from "../../../services/auth.service";
// import { toast } from "react-toastify";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fuelUser = authService.getCurrentFuelStation();
//     if (fuelUser) navigate("/seller/");
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await authService.fuelStationLogin(email, password);
//       toast.success("Login Successful");
//       localStorage.setItem("fuelStation", JSON.stringify(response.data));
//       navigate("/seller/");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-900 p-4">
//       <div className="bg-gray-800 p-8 lg:p-10 rounded-xl shadow-lg w-full max-w-md">
//         {/* Header */}
//         <h1 className="text-3xl lg:text-4xl text-white font-bold mb-2 text-center">
//           Seller Login
//         </h1>
//         <p className="text-gray-300 text-center mb-6 text-sm lg:text-base">
//           Login with your email and password
//         </p>

//         {/* Form */}
//         <form className="flex flex-col gap-4" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             required
//             onChange={(e) => setEmail(e.target.value)}
//             className="p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-sky-500 bg-gray-700 text-white"
//           />

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               minLength={8}
//               value={password}
//               required
//               onChange={(e) => setPassword(e.target.value)}
//               className="p-3 w-full rounded-lg border border-gray-600 focus:outline-none focus:border-sky-500 bg-gray-700 text-white"
//             />
//             {showPassword ? (
//               <AiOutlineEyeInvisible
//                 className="absolute right-3 top-3 text-white cursor-pointer"
//                 onClick={() => setShowPassword(false)}
//               />
//             ) : (
//               <AiOutlineEye
//                 className="absolute right-3 top-3 text-white cursor-pointer"
//                 onClick={() => setShowPassword(true)}
//               />
//             )}
//           </div>

//           <button
//             type="submit"
//             className="bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-full font-semibold shadow-md transition-colors duration-300 mt-2"
//           >
//             Login
//           </button>

//           {/* Bottom Buttons */}
//           <div className="flex justify-between mt-4 gap-2">
//             <button
//               type="button"
//               className="flex-1 border border-sky-500 text-white py-2 rounded-full hover:bg-sky-700 transition-colors duration-300"
//               onClick={(e) => {
//                 e.preventDefault();
//                 navigate("../register");
//               }}
//             >
//               Sign Up
//             </button>
//             <button
//               type="button"
//               className="flex-1 border border-sky-500 text-white py-2 rounded-full hover:bg-sky-700 transition-colors duration-300"
//               onClick={(e) => {
//                 e.preventDefault();
//                 navigate("/user/");
//               }}
//             >
//               User
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;








import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import authService from "../../../services/auth.service";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  /* ✅ CLEAR OLD SESSION ON PAGE LOAD */
  useEffect(() => {
    localStorage.removeItem("fuelStation");
    localStorage.removeItem("user");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.fuelStationLogin(email, password);

      toast.success("Login Successful");

      /* ✅ STORE FRESH SELLER DATA */
      localStorage.setItem("fuelStation", JSON.stringify(response.data));

      navigate("/seller/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 lg:p-10 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl lg:text-4xl text-white font-bold mb-2 text-center">
          Seller Login
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Login with your email and password
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              minLength={8}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 w-full rounded-lg bg-gray-700 text-white"
            />
            {showPassword ? (
              <AiOutlineEyeInvisible
                className="absolute right-3 top-3 text-white cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <AiOutlineEye
                className="absolute right-3 top-3 text-white cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-full font-semibold"
          >
            Login
          </button>

          <div className="flex justify-between mt-4 gap-2">
            <button
              type="button"
              onClick={() => navigate("../register")}
              className="flex-1 border border-sky-500 text-white py-2 rounded-full"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => navigate("/user/auth/login")}
              className="flex-1 border border-sky-500 text-white py-2 rounded-full"
            >
              User
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;
