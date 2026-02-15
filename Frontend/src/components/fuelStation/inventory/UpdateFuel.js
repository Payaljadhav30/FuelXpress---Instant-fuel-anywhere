import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineInventory2 } from "react-icons/md";
import authService from "../../../services/auth.service";
import LoginLight from "../../../assets/images/loginLight.jpg";

function UpdateFuel() {
  const [petrolQuantity, setPetrolQuantity] = useState("");
  const [petrolPrice, setPetrolPrice] = useState("");
  const [dieselQuantity, setDieselQuantity] = useState("");
  const [dieselPrice, setDieselPrice] = useState("");
  const navigate = useNavigate();
  const fuelStation = authService.getCurrentFuelStation();

  useEffect(() => {
    if (!fuelStation) navigate("../auth/login");
  }, []);

  const validateInputs = () => {
    if ((petrolPrice && !petrolQuantity) || (!petrolPrice && petrolQuantity)) {
      toast.warning("Please fill in both Petrol Price and Quantity");
      return false;
    }
    if ((dieselPrice && !dieselQuantity) || (!dieselPrice && dieselQuantity)) {
      toast.warning("Please fill in both Diesel Price and Quantity");
      return false;
    }
    return true;
  };

  const updateInventory = async () => {
    const quantity = {};
    if (petrolQuantity) quantity.petrol = { price: petrolPrice, quantity: petrolQuantity };
    if (dieselQuantity) quantity.diesel = { price: dieselPrice, quantity: dieselQuantity };
    try {
      const response = await authService.fuelInventoryUpdate(quantity, fuelStation.stationId);
      toast.success(response.data.message);
      localStorage.setItem("fuelStock", JSON.stringify({
      petrol: quantity.petrol?.quantity || 0,
      diesel: quantity.diesel?.quantity || 0,
    }));
      navigate("../");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update");
    }
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) updateInventory();
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center p-4 bg-gray-900"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${LoginLight})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-10 w-full max-w-5xl">
        {/* Icon & Title */}
        <div className="flex flex-col items-center text-white gap-4">
          <MdOutlineInventory2 className="text-5xl text-[#fe6f2b]" />
          <h1 className="text-3xl lg:text-4xl font-bold">Update Stock</h1>
        </div>

        {/* Form Card */}
        <form
          className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-white text-center">Update Inventory</h2>

          {/* Petrol Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Petrol Quantity (L)"
              value={petrolQuantity}
              onChange={(e) => setPetrolQuantity(e.target.value)}
              className="p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-sky-500"
            />
            <input
              type="number"
              placeholder="Petrol Price (₹/L)"
              value={petrolPrice}
              onChange={(e) => setPetrolPrice(e.target.value)}
              className="p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Diesel Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Diesel Quantity (L)"
              value={dieselQuantity}
              onChange={(e) => setDieselQuantity(e.target.value)}
              className="p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-sky-500"
            />
            <input
              type="number"
              placeholder="Diesel Price (₹/L)"
              value={dieselPrice}
              onChange={(e) => setDieselPrice(e.target.value)}
              className="p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold flex-1 shadow-md hover:shadow-lg transition">
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate("../")}
              className="border border-sky-500 text-white py-3 rounded-lg flex-1 hover:bg-sky-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateFuel;
