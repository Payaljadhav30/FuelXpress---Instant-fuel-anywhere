// import { Link, Outlet, useNavigate } from "react-router-dom";
// import AuthService from "../../services/auth.service";
// import { toast } from "react-toastify";
// import { BsFuelPump } from "react-icons/bs";

// function SellerLayout() {
//   const navigate = useNavigate();
//   const fuelStation = AuthService.getCurrentFuelStation();

//   if (!fuelStation) {
//     navigate("/seller/auth/login");
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("fuelStation");
//     localStorage.removeItem("user");
//     toast.success("Logged out successfully");
//     navigate("/seller/auth/login");
//   };

//   const menuItems = [
//     { label: "Home", link: "/seller" },
//     { label: "Order Fuel", link: "/seller/order" },
//     { label: "Order History", link: "/seller/orderHistory" },
//     { label: "Update Inventory", link: "/seller/update-inventory" },
//     { label: "Profile", link: "/seller/profile" },
//     { label: "Logout", action: handleLogout },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Top Navbar */}
//       <nav className="bg-gray-800 text-white shadow-md px-6 py-3 flex justify-between items-center">
//         <div className="flex items-center gap-2 text-xl font-bold">
//           <BsFuelPump className="text-orange-500" />
//           {fuelStation?.name || "Fuel Station"}
//         </div>

//         <ul className="flex gap-6">
//           {menuItems.map((item) =>
//             item.link ? (
//               <li key={item.label}>
//                 <Link
//                   to={item.link}
//                   className="hover:text-orange-500 transition"
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ) : (
//               <li
//                 key={item.label}
//                 onClick={item.action}
//                 className="cursor-pointer hover:text-orange-500 transition"
//               >
//                 {item.label}
//               </li>
//             )
//           )}
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-gray-900">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default SellerLayout;






import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthService from "../../services/auth.service";
import { toast } from "react-toastify";
import { BsFuelPump } from "react-icons/bs";

function SellerLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const fuelStation = AuthService.getCurrentFuelStation();

    if (!fuelStation) {
      navigate("/seller/auth/login", { replace: true });
    }
  }, [navigate]);

  const fuelStation = AuthService.getCurrentFuelStation();

  const handleLogout = () => {
    localStorage.removeItem("fuelStation");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/seller/auth/login", { replace: true });
  };

  const menuItems = [
    { label: "Home", link: "/seller" },
    { label: "Order Fuel", link: "/seller/order" },
    { label: "Order History", link: "/seller/orderHistory" },
    { label: "Update Inventory", link: "/seller/update-inventory" },
    { label: "Profile", link: "/seller/profile" },
    { label: "Logout", action: handleLogout },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-gray-800 text-white shadow-md px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-bold">
          <BsFuelPump className="text-orange-500" />
          {fuelStation?.name || "Fuel Station"}
        </div>

        <ul className="flex gap-6">
          {menuItems.map((item) =>
            item.link ? (
              <li key={item.label}>
                <Link
                  to={item.link}
                  className="hover:text-orange-500 transition"
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li
                key={item.label}
                onClick={item.action}
                className="cursor-pointer hover:text-orange-500 transition"
              >
                {item.label}
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
}

export default SellerLayout;
