// src/components/user/Profile/UpdateProfile.js
import LoginLight from "../../../assets/images/loginLight.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../../../services/auth.service";
import { toast } from "react-toastify";

function UpdateProfile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (!user) navigate("/user/auth/login");
  }, [user, navigate]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    try {
      await authService.updateProfilePassword(user.userId, oldPassword, newPassword).then(
        (response) => {
          toast.success(response.data.message);
          navigate("../logout");
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
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${LoginLight})`,
      }}
    >
      <div className="bg-gray-800 bg-opacity-80 rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-center text-3xl font-bold text-orange-500 mb-6">
          Change Password
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Please fill in your current and new password
        </p>

        <form className="space-y-5" onSubmit={onHandleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="oldPassword" className="text-white font-medium mb-1">
              Current Password
            </label>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              minLength={8}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter current password"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="newPassword" className="text-white font-medium mb-1">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter new password"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-white font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Update Password
            </button>
            <button
              type="button"
              onClick={() => navigate("../")}
              className="w-full bg-transparent border border-orange-500 hover:bg-orange-500 hover:text-white text-white font-semibold py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
