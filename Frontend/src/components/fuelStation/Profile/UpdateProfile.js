import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/auth.service";
import { toast } from "react-toastify";
import LoginLight from "../../../assets/images/loginLight.jpg";

function UpdateProfile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const fuelStation = authService.getCurrentFuelStation();

  useEffect(() => {
    if (!fuelStation) navigate("/seller/auth/login");
  }, [fuelStation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    try {
      await authService
        .updateSellerProfilePassword(fuelStation.stationId, oldPassword, newPassword)
        .then(
          (res) => {
            toast.success(res.data.message);
            navigate("../logout");
          },
          (err) => {
            toast.error(err.response?.data?.message || "Update failed");
          }
        );
    } catch (err) {
      console.log(err);
      toast.error("Unexpected error occurred");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${LoginLight})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-lg flex flex-col gap-4"
      >
        <h1 className="text-3xl text-white font-bold text-center">Change Password</h1>
        <p className="text-gray-300 text-center mb-6">
          Update your password securely
        </p>

        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          required
          minLength={8}
          onChange={(e) => setOldPassword(e.target.value)}
          className="p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-sky-500"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          required
          minLength={8}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-sky-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          minLength={8}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-sky-500"
        />

        <div className="flex flex-col gap-3 mt-4">
          <button className="bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold">
            Update Password
          </button>
          <button
            type="button"
            onClick={() => navigate("../")}
            className="border border-sky-500 text-white py-3 rounded-lg hover:bg-sky-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
