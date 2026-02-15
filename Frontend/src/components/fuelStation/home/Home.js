import { useEffect, useState } from "react";
import { BsFuelPump, BsFillDropletFill, BsCartCheck } from "react-icons/bs";
import AuthService from "../../../services/auth.service";
import SimpleMap from "../../map/Simple";
import LoginLight from "../../../assets/images/loginLight.jpg";

function Home() {
  const [pointer, setPointer] = useState(null);
  const [name, setName] = useState("");
  const [fuelStock, setFuelStock] = useState({ petrol: 0, diesel: 0 });
  const [ordersToday, setOrdersToday] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  const fuelStation = AuthService.getCurrentFuelStation();

  useEffect(() => {
    if (!fuelStation) return;

    // Load fuel stock from localStorage first
    const localStock = localStorage.getItem("fuelStock");
    if (localStock) {
      setFuelStock(JSON.parse(localStock));
    } else {
      getFuelStockFromBackend();
    }

    getStationData(); // always fetch station info
    getOrdersStats(); // fetch today & pending orders
  }, [fuelStation]);

  // Fetch Station Info
  const getStationData = async () => {
    try {
      const response = await AuthService.getFuelStationByID(fuelStation.stationId);
      setName(response.data.name);
      setPointer(response.data.location);
    } catch (err) {
      console.log(err?.response?.data?.message || err.message);
    }
  };

  // Fetch Inventory from Backend if localStorage is empty
  const getFuelStockFromBackend = async () => {
    try {
      const inventoryResp = await AuthService.getFuelInventory(fuelStation.stationId);
      const stock = {
        petrol: inventoryResp.data.petrol?.quantity || 0,
        diesel: inventoryResp.data.diesel?.quantity || 0,
      };
      setFuelStock(stock);
    } catch (err) {
      console.log(err?.response?.data?.message || err.message);
    }
  };

  // Fetch Orders Stats
  const getOrdersStats = async () => {
    try {
      const response = await AuthService.getOrders(fuelStation.stationId);
      const orders = response.data || [];

      const today = new Date();
      const todayOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        return (
          orderDate.getDate() === today.getDate() &&
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getFullYear() === today.getFullYear()
        );
      });

      setOrdersToday(todayOrders.length);
      const pending = todayOrders.filter(o => !o.isDelivered.status).length;
      setPendingOrders(pending);
    } catch (err) {
      console.log(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div
      className="w-screen min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${LoginLight})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-10">
        {/* Map Panel */}
        <div className="lg:w-1/2 w-full h-72 rounded-2xl overflow-hidden shadow-2xl">
          {pointer && <SimpleMap pointer={pointer} setPointer={setPointer} disable={true} />}
        </div>

        {/* Info Panel */}
        <div className="lg:w-1/2 w-full flex flex-col gap-6 text-white">
          <h1 className="text-3xl lg:text-4xl font-bold flex items-center gap-3">
            <BsFuelPump className="text-orange-500" />
            {name || "Fuel Station"}
          </h1>
          <p className="text-lg text-gray-300">Welcome to your dashboard!</p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-3 shadow-lg">
              <BsFillDropletFill className="text-blue-400 text-3xl" />
              <div>
                <h3 className="font-bold text-lg">Petrol Stock</h3>
                <p className="text-gray-300">{fuelStock.petrol} L</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-3 shadow-lg">
              <BsFillDropletFill className="text-yellow-400 text-3xl" />
              <div>
                <h3 className="font-bold text-lg">Diesel Stock</h3>
                <p className="text-gray-300">{fuelStock.diesel} L</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-3 shadow-lg">
              <BsCartCheck className="text-green-400 text-3xl" />
              <div>
                <h3 className="font-bold text-lg">Orders Today</h3>
                <p className="text-gray-300">{ordersToday}</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-3 shadow-lg">
              <BsCartCheck className="text-red-400 text-3xl" />
              <div>
                <h3 className="font-bold text-lg">Pending Orders</h3>
                <p className="text-gray-300">{pendingOrders}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
