import { useState } from "react";
import LeafletMap from "../LeafletMap";  

function OrderPreview({
  order,
  setOnCancel,
  setOnApply,
  setOnClose,
  userInfo,
  setOnDelivery,
  disable = false,
}) {
  const { address, fuel, isAccepted, isCanceled, isDelivered, method, userId } = order;
  const { name, phone, emailId } = userInfo;
  const [pointer, setPointer] = useState({
    lat: 20.9027072,
    lng: 77.758464,
  });

  const renderedOrderInfo = (
    <>
      <div className="place-self-start">
        {fuel.petrol && (
          <div className="text-sm text-black font-semibold">
            <p>Petrol: </p>
            <p className="text-sm text-black font-thin">
              {fuel.petrol.price} ₹/L ( Quantity: {fuel.petrol.quantity} L)
            </p>
          </div>
        )}
        <br />
        {fuel.diesel && (
          <div className="text-sm text-black font-semibold">
            <p>Diesel: </p>
            <p className="text-sm text-black font-thin">
              {fuel.diesel.price} ₹/L ( Quantity: {fuel.diesel.quantity} L)
            </p>
          </div>
        )}
        <div className="text-sm text-black font-semibold">
          <p className="text-sm text-black font-thin">
            Cost: Rs-{method.cash ? method.cash : method.online.amount}
          </p>
        </div>
      </div>
      <div className="text-sm font-semibold">
        <p className={`${isAccepted.status && !isDelivered.status ? "text-[#32CD32] font-bold" : "hidden"}`}>
          Status: On The Way
        </p>
        <p className={`${isCanceled.status ? "text-red-900 font-bold" : "hidden"}`}>
          Status: Canceled
        </p>
        <p className={`${isDelivered.status ? "text-[#32CD32] font-bold" : "hidden"}`}>
          Status: Delivered
        </p>
      </div>
    </>
  );

  return (
    <>
      <div className="h-screen justify-center flex lg:my-10 md:my-10 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full h-[100%] mx-auto max-w-3xl">
          {/* Content */}
          <div className="border-0 h-[100%] lg:h-[90%] md:h-[90%] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Body */}
            <div className="relative p-6 flex h-[100%] flex-col">
              <div className="h-2/3 flex justify-center items-center">
                {/* Replaced SimpleMap with LeafletMap */}
                <LeafletMap latitude={pointer.lat} longitude={pointer.lng} stationName="Selected Location" />
              </div>
              <div className="w-full lg:md:2/3 flex flex-col gap-3">
                <h3 className="text-orange text-xl font-semibold text-black">{name}</h3>
                {renderedOrderInfo}
              </div>
              <div className="flex items-center flex-col w-full justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 w-full background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOnClose(false)}
                >
                  Close
                </button>
                <button
                  className={`bg-red-500 ${isAccepted.status || disable ? "hidden" : ""} text-white w-full background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                  type="button"
                  onClick={() => setOnCancel(order)} // Pass order to setOnCancel
                >
                  {isCanceled.status ? "Canceled" : "Cancel"}
                </button>
                <button
                  className={`bg-emerald-500 ${isCanceled.status || disable ? "hidden" : ""} w-full text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                  type="button"
                  onClick={() => setOnApply(order)} // Pass order to setOnApply
                >
                  {isAccepted.status ? "Accepted" : "Accept"}
                </button>
                <button
                  className={`bg-emerald-500 ${isCanceled.status || !isAccepted.status || disable ? "hidden" : ""} w-full text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                  type="button"
                  onClick={() => setOnDelivery(order)} // Pass order to setOnDelivery
                >
                  {isDelivered.status ? "Delivered" : "Delivery"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default OrderPreview;
