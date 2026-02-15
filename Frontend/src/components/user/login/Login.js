import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import authService from "../../../services/auth.service";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (user) navigate("/user/");
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password).then(
        () => {
          toast.success("Login Successful");
          navigate("/user/");
        },
        (error) => {
          toast.error(error.response.data.message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-10">
      <form
        className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6"
        onSubmit={handleLogin}
      >
        <h1 className="text-white text-3xl md:text-4xl font-bold text-center">
          User Login
        </h1>
        <p className="text-gray-300 text-center">
          Login with your email and password
        </p>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-white font-semibold mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            className="bg-gray-700 text-white placeholder-gray-300 border-2 border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label className="text-white font-semibold mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="bg-gray-700 text-white placeholder-gray-300 border-2 border-gray-600 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:border-purple-500"
          />
          {showPassword ? (
            <AiOutlineEyeInvisible
              className="absolute right-3 top-3 text-xl text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiOutlineEye
              className="absolute right-3 top-3 text-xl text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button className="bg-[#fe6f2b] hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
            Login
          </button>
          <button
            className="bg-transparent border border-[#fe6f2b] hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              navigate("../register");
            }}
          >
            Sign Up
          </button>
          <button
            className="bg-transparent border border-[#fe6f2b] hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              navigate("/seller/");
            }}
          >
            Seller
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
