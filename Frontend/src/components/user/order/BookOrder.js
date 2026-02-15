import { useEffect, useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import authService from "../../../services/auth.service";
import LoginLight from "../../../assets/images/loginLight.jpg";
import Modal from "../../modal/Modal";
import BookPreview from "../../modal/BookPreview";

function BookOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [station, setStation] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [address, setAddress] = useState(null);

  const [petrolQty, setPetrolQty] = useState(0);
  const [dieselQty, setDieselQty] = useState(0);
  const [petrolPrice, setPetrolPrice] = useState(0);
  const [dieselPrice, setDieselPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [method, setMethod] = useState({ cash: 0 });

  const user = authService.getCurrentUser();

  // Fetch station and user info
  useEffect(() => {
    if (!user) navigate("/user/login");

    const fetchStation = async () => {
      try {
        const response = await authService.getFuelStationByID(id);
        setStation(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await authService.getUserInfo(user.userId);
        setUserInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStation();
    fetchUser();
  }, [id, user, navigate]);

  // Price calculations
  useEffect(() => setPetrolPrice(petrolQty * (station?.quantity?.petrol?.price || 0)), [petrolQty, station]);
  useEffect(() => setDieselPrice(dieselQty * (station?.quantity?.diesel?.price || 0)), [dieselQty, station]);
  useEffect(() => setTotalPrice(petrolPrice + dieselPrice), [petrolPrice, dieselPrice]);

  const proceedOrder = async () => {
    const fuel = {};
    if (petrolQty) fuel.petrol = { price: petrolPrice, quantity: petrolQty };
    if (dieselQty) fuel.diesel = { price: dieselPrice, quantity: dieselQty };

    const demoTransaction = { demo: { transactionID: "DEMO123456", status: "success" } };

    try {
      const response = await authService.postOrder(
        user.userId,
        id,
        address,
        fuel,
        demoTransaction
      );

      if (response.data.order) {
        toast.success("Order Placed Successfully!");
        navigate("/user/");
      } else {
        toast.warning("Something went wrong. Try again.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Order failed");
    }
  };

  const onSubmit = (e) => e.preventDefault();

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-gray-900 bg-cover bg-center px-4 py-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${LoginLight})`,
      }}
    >
      {/* Card Container */}
      <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 flex flex-col gap-5">
        
        {/* Station Header */}
        {station && (
          <div className="flex flex-col items-center gap-2">
            <BsFuelPump className="text-[#fe6f2b] text-5xl" />
            <h1 className="text-white text-2xl font-semibold text-center truncate">{station.name}</h1>
          </div>
        )}

        {/* Address */}
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">Address</label>
          <button

          
            className="bg-[#fe6f2b] hover:bg-[#F59337] text-white text-sm font-medium py-2 rounded-md transition"
            onClick={(e) => {
              e.preventDefault();
              setShowMapModal(!showMapModal);
            }}
          >
            {address ? "Change Location" : "Select Location"}
          </button>
          {showMapModal && (
            <Modal
              setOnCancel={() => setShowMapModal(false)}
              setOnSubmit={(pointer) => {
                if (pointer?.lat && pointer?.lng) setAddress(pointer);
                else toast.error("Invalid location selected!");
                setShowMapModal(false);
              }}
            />
          )}
        </div>

       {/* Fuel Inputs */}
<div className="flex flex-col gap-3">
  {/* Petrol */}
  <div className="flex gap-2 items-center">
    <label className="text-white text-sm w-20">Petrol</label>
    <input
      type="number"
      min={0}
      value={petrolQty}
      onChange={(e) => {
        const val = parseFloat(e.target.value);
        if (val > (station?.quantity?.petrol?.quantity || 0)) toast.warning("Quantity not available!");
        else setPetrolQty(val);
      }}
      placeholder="Qty (L)"
      className="w-32 py-2 px-3 rounded-md border border-gray-300 text-sm"
    />
    <input
      type="number"
      readOnly
      value={petrolPrice}
      placeholder="Price"
      className="w-36 py-2 px-3 rounded-md border border-gray-300 bg-gray-200 text-sm"
    />
  </div>

  {/* Diesel */}
  <div className="flex gap-2 items-center">
    <label className="text-white text-sm w-20">Diesel</label>
    <input
      type="number"
      min={0}
      value={dieselQty}
      onChange={(e) => {
        const val = parseFloat(e.target.value);
        if (val > (station?.quantity?.diesel?.quantity || 0)) toast.warning("Quantity not available!");
        else setDieselQty(val);
      }}
      placeholder="Qty (L)"
      className="w-32 py-2 px-3 rounded-md border border-gray-300 text-sm"
    />
    <input
      type="number"
      readOnly
      value={dieselPrice}
      placeholder="Price"
      className="w-36 py-2 px-3 rounded-md border border-gray-300 bg-gray-200 text-sm"
    />
  </div>
</div>

{/* Total */}
<p className="text-white text-sm font-semibold text-right mt-1">
  Total: ₹{totalPrice}
</p>


        <div className="flex flex-row gap-2 justify-center mt-4">
  {/* Select Location */}
  
  {/* Proceed */}
  <button
    className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-1 px-4 rounded transition"
    onClick={(e) => {
      e.preventDefault();
      if (!address) return toast.warning("Select address");
      if (!petrolQty && !dieselQty) return toast.warning("Enter fuel quantity");
      setShowOrderModal(true);
    }}
  >
    Proceed
  </button>

  {/* Cancel */}
  <button
    className="bg-gray-700 hover:bg-gray-800 text-white text-sm font-semibold py-1 px-4 rounded transition"
    onClick={(e) => {
      e.preventDefault();
      navigate("../");
    }}
  >
    Cancel
  </button>
</div>


        {/* Order Preview Modal */}
        {showOrderModal && (
          <BookPreview
            address={address}
            method={method}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            setMethod={setMethod}
            order={station}
            user={userInfo}
            petrolPrice={petrolPrice}
            petrolQuantity={petrolQty}
            dieselPrice={dieselPrice}
            dieselQuantity={dieselQty}
            setOnCancel={() => setShowOrderModal(false)}
            setOnProceed={proceedOrder}
          />
        )}
      </div>
    </div>
  );
}

export default BookOrder;

