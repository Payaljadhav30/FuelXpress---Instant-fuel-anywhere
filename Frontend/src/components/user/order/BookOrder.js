/*import { useEffect, useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import authService from "../../../services/auth.service";
import LoginLight from "../../../assets/images/loginLight.jpg"; // Make sure the path is correct
import Modal from "../../modal/Modal";
import BookPreview from "../../modal/BookPreview";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function BookOrder() {
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [address, setAddress] = useState(null);
  const [petrolQuantity, setPetrolQuantity] = useState(0);
  const [petrolPrice, setPetrolPrice] = useState(0);
  const [dieselQuantity, setDieselQuantity] = useState(0);
  const [dieselPrice, setDieselPrice] = useState(0);
  const [method, setMethod] = useState({ cash: 0 });
  const [myStations, setMyStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);  // Added totalPrice state

  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const ownerId = user ? user.userId : null;

  const getResposne = async () => {
    try {
      const response = await authService.getFuelStationByID(id);
      setStation(response.data);
    } catch (err) {
      console.error("Error fetching station:", err?.response?.data?.message || err.message);
    }
  };

  const getUserResponse = async () => {
    try {
      const response = await authService.getUserInfo(user.userId);
      setUserInfo(response.data);
    } catch (err) {
      console.error("Error fetching user info:", err?.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (!user) navigate("/user/login");
  }, [user]);

  useEffect(() => {
    if (ownerId) {
      const fetchStations = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/fuelstations/my-stations/${ownerId}`
          );
          setMyStations(response.data.stations);
        } catch (error) {
          console.error("Error fetching your stations", error);
        }
      };
      fetchStations();
    }
  }, [ownerId]);

  useEffect(() => {
    getResposne();
    getUserResponse();
  }, []);

  useEffect(() => {
    if (petrolQuantity && station) {
      setPetrolPrice(parseFloat(petrolQuantity) * station.quantity.petrol.price);
    } else {
      setPetrolQuantity(0);
      setPetrolPrice(0);
    }
  }, [petrolQuantity]);

  useEffect(() => {
    if (dieselQuantity && station) {
      setDieselPrice(parseFloat(dieselQuantity) * station.quantity.diesel.price);
    } else {
      setDieselQuantity(0);
      setDieselPrice(0);
    }
  }, [dieselQuantity]);

  // Recalculate total price whenever petrol or diesel prices change
  useEffect(() => {
    setTotalPrice(petrolPrice + dieselPrice);
  }, [petrolPrice, dieselPrice]);

  const proceedOrder = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setShowOrderModal(false);

    // DEMO ONLY: Simulate success response with fake transaction ID
    const simulatedMethod = {
      demo: {
        transactionID: "DEMO123456",
        status: "success",
      },
    };
    postOrder(simulatedMethod);
  };

  const postOrder = async (method) => {
    const fuel = {};
    if (petrolQuantity) fuel.petrol = { price: petrolPrice, quantity: petrolQuantity };
    if (dieselQuantity) fuel.diesel = { price: dieselPrice, quantity: dieselQuantity };

    try {
      const response = await authService.postOrder(user.userId, selectedStation, address, fuel, method);
      if (response.data.order) {
        toast.success("Order Placed Successfully (Demo)");
        navigate("/user/");
      } else {
        toast.warning("Some Issue Detected");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Order failed");
    }
  };

  const onHandleSubmit = (e) => e.preventDefault();

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-fixed"
      style={{
        backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${LoginLight})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
*///      {/* Book Order Text - Positioned at the top left corner */}
/*      <div className="absolute top-6 left-6 text-white text-[36px] lg:text-[48px] font-bold">
        Book Order
      </div>

*///     {/* Fuel Station Name and Icon - Positioned below Book Order */}
 //    {station && (
 //      <div className="flex flex-col justify-center items-center gap-3 mt-12"> {/* Adjusted margin-top */}
 //      <div className="flex flex-row gap-3 items-center">
 //         <BsFuelPump className="text-[#fe6f2b] text-[54px]" />
 //         <h1 className="text-center text-white text-[54px] font-bold"> {/* Changed color to white */}
 //          {station.name}
  /*        </h1>
       </div>
     </div>
    )}


*///      {/* Address Button */}
 /*     <div className="flex flex-col justify-center items-center gap-5 lg:w-[30%] lg:flex-row mt-20">
        <form className="w-full max-w-sm" onSubmit={onHandleSubmit}>
          <div className="gap-3 md:flex md:items-center mb-6">
            <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">Address</label>
            <button
              className="bg-transparent hover:bg-[#F59337] font-semibold hover:text-white py-2 px-4 border border-[#fe6f2b] hover:border-transparent text-white rounded"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(!showModal);
              }}
            >
              Show Map
            </button>
            {showModal && (
              <Modal
                setOnCancel={() => setShowModal(false)}
                setOnSubmit={(pointer) => {
                  if (pointer && pointer.lat && pointer.lng) {
                    setAddress(pointer);
                  } else {
                    toast.error("Invalid location selected!");
                  }
                  setShowModal(false);
                }}
              />
            )}
          </div>

   *///       {/* Petrol Inputs */}
   /*       <div className="gap-3 md:flex md:items-center mb-6">
            <label className="block text-white font-bold pr-4">Petrol</label>
            <input
              type="number"
              value={petrolQuantity}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (val > station.quantity.petrol.quantity) {
                  toast.warning("Quantity Not Available");
                } else {
                  setPetrolQuantity(val);
                }
              }}
              placeholder="Quantity"
              className="bg-gray-200 border-2 rounded py-2 px-4 text-gray-700"
            />
            <input
              type="number"
              readOnly
              value={petrolPrice}
              placeholder="Price"
              className="bg-gray-200 border-2 rounded py-2 px-4 text-gray-700"
            />
          </div>

     *///     {/* Diesel Inputs */}
     /*     <div className="gap-3 md:flex md:items-center mb-6">
            <label className="block text-white font-bold pr-4">Diesel</label>
            <input
              type="number"
              value={dieselQuantity}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (val > station.quantity.diesel.quantity) {
                  toast.warning("Quantity Not Available");
                } else {
                  setDieselQuantity(val);
                }
              }}
              placeholder="Quantity"
              className="bg-gray-200 border-2 rounded py-2 px-4 text-gray-700"
            />
            <input
              type="number"
              readOnly
              value={dieselPrice}
              placeholder="Price"
              className="bg-gray-200 border-2 rounded py-2 px-4 text-gray-700"
            />
          </div>

   *///       {/* Buttons */}
   /*       <div className="actions w-full flex flex-col gap-4">
            <button
              className="bg-[#fe6f2b] hover:bg-[#F59337] w-full text-white font-bold py-2 px-4 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                if (!address) return toast.warning("Please select address");
                if (petrolQuantity || dieselQuantity) {
                  setShowOrderModal(true);
                } else {
                  toast.warning("Please enter fuel quantity");
                }
              }}
            >
              Order
            </button>

            <button
              className="bg-transparent border border-[#fe6f2b] w-full hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                navigate("../");
              }}
            >
              Cancel
            </button>
          </div>

          {showOrderModal && (
            <BookPreview
              address={address}
              method={method}
              totalPrice={totalPrice}  // Pass the totalPrice state
              setTotalPrice={setTotalPrice} 
              setMethod={setMethod} // Pass the setTotalPrice function
              order={station}
              user={userInfo}
              petrolPrice={petrolPrice}
              petrolQuantity={petrolQuantity}
              dieselQuantity={dieselQuantity}
              dieselPrice={dieselPrice}
              setOnCancel={() => setShowOrderModal(false)}
              setOnProceed={proceedOrder}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default BookOrder;

*/



















import { useEffect, useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import authService from "../../../services/auth.service";
import LoginLight from "../../../assets/images/loginLight.jpg";
import Modal from "../../modal/Modal";
import BookPreview from "../../modal/BookPreview";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function BookOrder() {
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [address, setAddress] = useState(null);
  const [petrolQuantity, setPetrolQuantity] = useState(0);
  const [petrolPrice, setPetrolPrice] = useState(0);
  const [dieselQuantity, setDieselQuantity] = useState(0);
  const [dieselPrice, setDieselPrice] = useState(0);
  const [method, setMethod] = useState({ cash: 0 });
  const [myStations, setMyStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const ownerId = user ? user.userId : null;

  const getResposne = async () => {
    try {
      const response = await authService.getFuelStationByID(id);
      setStation(response.data);
    } catch (err) {
      console.error("Error fetching station:", err?.response?.data?.message || err.message);
    }
  };

  const getUserResponse = async () => {
    try {
      const response = await authService.getUserInfo(user.userId);
      setUserInfo(response.data);
    } catch (err) {
      console.error("Error fetching user info:", err?.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (!user) navigate("/user/login");
  }, [user]);

  useEffect(() => {
    if (ownerId) {
      const fetchStations = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/fuelstations/my-stations/${ownerId}`
          );
          setMyStations(response.data.stations);
        } catch (error) {
          console.error("Error fetching your stations", error);
        }
      };
      fetchStations();
    }
  }, [ownerId]);

  useEffect(() => {
    getResposne();
    getUserResponse();
  }, []);

  useEffect(() => {
    if (petrolQuantity && station) {
      setPetrolPrice(parseFloat(petrolQuantity) * station.quantity.petrol.price);
    } else {
      setPetrolQuantity(0);
      setPetrolPrice(0);
    }
  }, [petrolQuantity]);

  useEffect(() => {
    if (dieselQuantity && station) {
      setDieselPrice(parseFloat(dieselQuantity) * station.quantity.diesel.price);
    } else {
      setDieselQuantity(0);
      setDieselPrice(0);
    }
  }, [dieselQuantity]);

  useEffect(() => {
    setTotalPrice(petrolPrice + dieselPrice);
  }, [petrolPrice, dieselPrice]);

  const proceedOrder = async () => {
    const fuel = {};
    if (petrolQuantity) fuel.petrol = { price: petrolPrice, quantity: petrolQuantity };
    if (dieselQuantity) fuel.diesel = { price: dieselPrice, quantity: dieselQuantity };

    const demoTransaction = {
      demo: {
        transactionID: "DEMO123456",
        status: "success",
      },
    };

    try {
      const response = await authService.postOrder(
        user.userId,
        selectedStation || id,
        address,
        fuel,
        demoTransaction
      );
      if (response.data.order) {
        toast.success("Order Placed Successfully ");
        navigate("/user/");
      } else {
        toast.warning("Some Issue Detected");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Order failed");
    }
  };

  const onHandleSubmit = (e) => e.preventDefault();

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-fixed"
      style={{
        backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${LoginLight})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-6 left-6 text-white text-[36px] lg:text-[48px] font-bold">
        Book Order
      </div>

      {station && (
        <div className="flex flex-col justify-center items-center gap-3 mt-12">
          <div className="flex flex-row gap-3 items-center">
            <BsFuelPump className="text-[#fe6f2b] text-[54px]" />
            <h1 className="text-center text-white text-[54px] font-bold">{station.name}</h1>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center gap-5 lg:w-[30%] lg:flex-row mt-20">
        <form className="w-full max-w-sm" onSubmit={onHandleSubmit}>
          <div className="gap-3 md:flex md:items-center mb-6">
            <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">Address</label>
            <button
              className="bg-transparent hover:bg-[#F59337] font-semibold hover:text-white py-2 px-4 border border-[#fe6f2b] hover:border-transparent text-white rounded"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(!showModal);
              }}
            >
              Show Map
            </button>
            {showModal && (
              <Modal
                setOnCancel={() => setShowModal(false)}
                setOnSubmit={(pointer) => {
                  if (pointer && pointer.lat && pointer.lng) {
                    setAddress(pointer);
                  } else {
                    toast.error("Invalid location selected!");
                  }
                  setShowModal(false);
                }}
              />
            )}
          </div>

          <div className="gap-3 md:flex md:items-center mb-6">
            <label className="block text-white font-bold pr-4">Petrol</label>
            <input
              type="number"
              value={petrolQuantity}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (val > station.quantity.petrol.quantity) {
                  toast.warning("Quantity Not Available");
                } else {
                  setPetrolQuantity(val);
                }
              }}
              placeholder="Quantity"
              className="bg-gray-200 border-2 rounded py-2 px-4 text-gray-700"
            />
            <input
              type="number"
              readOnly
              value={petrolPrice}
              placeholder="Price"
              className="bg-gray-200 border-2 rounded py-2 px-4 text-gray-700"
            />
          </div>

          <div className="gap-3 md:flex md:items-center mb-6">
            <label className="block text-white font-bold pr-4">Diesel</label>
            <input
              type="number"
              value={dieselQuantity}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (val > station.quantity.diesel.quantity) {
                  toast.warning("Quantity Not Available");
                } else {
                  setDieselQuantity(val);
                }
              }}
              placeholder="Quantity"
              className="bg-gray-200 border-2 rounded py-2 px-4 text-gray-700"
            />
            <input
              type="number"
              readOnly
              value={dieselPrice}
              placeholder="Price"
              className="bg-gray-200 border-2 rounded py-2 px-4 text-gray-700"
            />
          </div>

          <div className="actions w-full flex flex-col gap-4">
            <button
              className="bg-[#fe6f2b] hover:bg-[#F59337] w-full text-white font-bold py-2 px-4 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                if (!address) return toast.warning("Please select address");
                if (petrolQuantity || dieselQuantity) {
                  setShowOrderModal(true);
                } else {
                  toast.warning("Please enter fuel quantity");
                }
              }}
            >
              Order
            </button>

            <button
              className="bg-transparent border border-[#fe6f2b] w-full hover:bg-[#F59337] text-white font-bold py-2 px-4 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                navigate("../");
              }}
            >
              Cancel
            </button>
          </div>

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
              petrolQuantity={petrolQuantity}
              dieselQuantity={dieselQuantity}
              dieselPrice={dieselPrice}
              setOnCancel={() => setShowOrderModal(false)}
              setOnProceed={proceedOrder}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default BookOrder;
