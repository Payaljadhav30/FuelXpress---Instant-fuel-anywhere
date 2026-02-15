// src/components/user/register/Register.js
import { useEffect, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { toast } from "react-toastify";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (user) navigate("/user/");
  }, [user, navigate]);

  const onHandleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(email, password, name, phno).then(
        (response) => {
          toast.success(response.data.message);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 bg-opacity-90 rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500 mb-2">Register</h1>
          <p className="text-gray-300 text-sm">
            Create your account with email and password
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={onHandleSignup}>
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="First Middle Last"
              className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phno" className="text-white font-medium mb-1">
              Phone Number
            </label>
            <input
              id="phno"
              type="text"
              value={phno}
              minLength={10}
              maxLength={13}
              required
              onChange={(e) => setPhno(e.target.value)}
              placeholder="+91XXXXXXXXXX"
              className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-white font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-gray-700 text-white rounded-lg px-4 py-2 pr-10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {showPassword ? (
              <AiOutlineEyeInvisible
                className="absolute top-2.5 right-3 text-gray-300 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <AiOutlineEye
                className="absolute top-2.5 right-3 text-gray-300 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => navigate("../login")}
              className="w-full bg-transparent border border-orange-500 hover:bg-orange-500 hover:text-white text-white font-semibold py-2 rounded-lg transition"
            >
              Already have an account? Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
