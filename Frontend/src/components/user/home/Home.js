import LoginLight from "../../../assets/images/loginLight.jpg";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { useEffect, useState } from "react";
import SimpleMap from "../../map/Simple";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  const [name, setName] = useState("");
  const [pointer, setPointer] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/user/auth/login");
    }
  }, [user]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setPointer({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const getResposne = async () => {
    try {
      await AuthService.getUserInfo(user.userId).then(
        (response) => {
          setName(response.data.name);
        },
        (error) => {
          console.log(error.response.data.message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getResposne();
  }, []);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(45deg,rgba(0,0,0, 0.75),rgba(0,0,0, 0.75)),url(${LoginLight})`,
        backgroundPosition: `50% 50%`,
        backgroundSize: `cover`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-full h-full flex-col gap-5 justify-evenly items-center lg:flex-row lg:gap-0 md:gap-5">
        <div className="flex w-full h-1/2 lg:w-1/2 lg:h-[75%]">
          {pointer?.lat !== undefined && pointer?.lng !== undefined ? (
            <SimpleMap
              pointer={pointer}
              setPointer={setPointer}
              disable={true}
            />
          ) : null}
        </div>

        <div className="flex flex-col justify-center items-center gap-5 lg:w-[30%] w-full">
          <div className="text-white text-center text-[42px] flex flex-row justify-center items-center gap-3 font-sans lg:text-[64px] md:text-[54px]">
            <h1>{"Hey, " + name.split(" ")[0]}</h1>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 w-full">
            <Link
              to="/user/order"
              className="flex items-center justify-center w-[160px] h-[80px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
            >
              <h5 className="text-xl font-bold tracking-tight text-white">
                Order Fuel
              </h5>
            </Link>

            <Link
              to="/user/orderHistory"
              className="flex items-center justify-center w-[160px] h-[80px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
            >
              <h5 className="text-xl font-bold tracking-tight text-white">
                Order History
              </h5>
            </Link>

            <Link
              to="/user/Profile"
              className="flex items-center justify-center w-[160px] h-[80px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
            >
              <h5 className="text-xl font-bold tracking-tight text-white">
                Profile
              </h5>
            </Link>

            <Link
              to="/user/logout"
              className="flex items-center justify-center w-[160px] h-[80px] bg-gray-800 rounded-lg shadow hover:bg-[#fe6f2b]"
            >
              <h5 className="text-xl font-bold tracking-tight text-white">
                Log out
              </h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
