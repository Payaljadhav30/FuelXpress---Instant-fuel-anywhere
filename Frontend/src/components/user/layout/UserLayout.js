import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function UserLayout() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
