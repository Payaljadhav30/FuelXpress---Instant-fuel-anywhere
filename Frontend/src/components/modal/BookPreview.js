import { useEffect, useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { getDistance } from "geolib";
import LeafletMap from "../LeafletMap"; 

function BookPreview({
  order,
  setOnCancel,
  setOnProceed,
  totalPrice,
  setTotalPrice,
  method,
  setMethod,
  petrolPrice,
  petrolQuantity,
  dieselPrice,
  dieselQuantity,
  address,
}) {
  const deliveryCharge = 5;
  const { location, name, fuel } = order;

  // Safe initialization with fallback
  const [pointer, setPointer] = useState(location || { lat: 0, lng: 0 });

  const distance = parseInt(
    getDistance(
      { latitude: location?.lat || 0, longitude: location?.lng || 0 },
      { latitude: address?.lat || 0, longitude: address?.lng || 0 }
    ) / 1000
  );

  const [totalDeliveryCharge, setTotalDeliveryCharge] = useState(
    distance * deliveryCharge
  );

  useEffect(() => {
    setTotalPrice(petrolPrice + dieselPrice + totalDeliveryCharge);
  }, [petrolPrice, dieselPrice, totalDeliveryCharge, setTotalPrice]);

  useEffect(() => {
    setMethod({
      cash: totalPrice,
    });
  }, [totalPrice, setMethod]);

  return (
    <>
      <div className="justify-center h-full flex lg:my-10 md:my-10 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full h-[100%] mx-auto max-w-3xl">
          <div className="border-0 lg:h-[90%] md:h-[100%] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none overflow-scroll focus:outline-none">
            <form className="relative p-6 flex h-[100%] justify-center flex-col lg:flex-row">
              <div className="flex flex-col h-full md:w-1/2 items-center text-[#fe6f2b] text-[36px]">
                <h1>Bill</h1>
                <div className="place-self-start">
                  <div className="text-[24px] text-black font-semibold">
                    <p>Petrol:</p>
                    <p className="text-[24px] font-thin">
                      Total: {petrolPrice} ₹ ( Quantity: {petrolQuantity} L)
                    </p>
                  </div>
                  <div className="text-[24px] text-black font-semibold">
                    <p>Diesel:</p>
                    <p className="text-[24px] font-thin">
                      Total: {dieselPrice} ₹ ( Quantity: {dieselQuantity} L)
                    </p>
                  </div>
                  <div className="text-[24px] text-black font-semibold">
                    <p>Delivery Charge ({deliveryCharge} per km):</p>
                    <p className="text-[24px] font-thin">
                      Total Distance: {distance} / km <br />
                      Delivery Charge: {totalDeliveryCharge}
                    </p>
                  </div>
                  <div className="text-[24px] text-black font-semibold">
                    <p>Total Bill:</p>
                    <p className="text-[24px] font-thin">
                      Total: {totalPrice}
                    </p>
                  </div>
                </div>
                <div className="gap-3 mb-6 w-full flex flex-col">
                  <div className="flex flex-col">
                    <label
                      className="text-[#fe6f2b] text-[36px] font-bold md:text-left mb-1 md:mb-0 pr-4"
                      htmlFor="inline-diesel"
                    >
                      Payment Method
                    </label>
                  </div>
                  <div className="mb-3 w-full flex flex-col gap-5 lg:mb-0">
                    <div className="flex items-center pl-4 border rounded border-[#F59337]">
                      <input
                        id="online"
                        type="radio"
                        value="online"
                        checked={method?.online ? true : false}
                        name="method"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMethod({
                              online: {
                                amount: totalPrice,
                              },
                            });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border border-[#F59337] focus:ring-blue-500"
                      />
                      <label
                        htmlFor="online"
                        className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Online
                      </label>
                    </div>
                    <div className="flex items-center pl-4 border rounded border-[#F59337]">
                      <input
                        checked={method?.cash ? true : false}
                        id="cash"
                        type="radio"
                        value="cash"
                        name="method"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMethod({
                              cash: totalPrice,
                            });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-[#F59337] focus:ring-blue-500"
                      />
                      <label
                        htmlFor="cash"
                        className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Cash
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex md:w-1/2 flex-col h-full">
                <div className="relative p-6 flex h-[100%] flex-col text-black">
                  <div className="flex flex-col lg:flex-row h-full justify-center items-center gap-3 p-3">
                    <BsFuelPump className="text-[#fe6f2b] text-[36px]" />
                    <h1 className="text-center text-[44px] font-bold text-black">
                      {name}
                    </h1>
                  </div>
                  <div className="h-full flex justify-center items-center">
                    {pointer?.lat != null && pointer?.lng != null && (
                      <LeafletMap
                        latitude={pointer.lat}
                        longitude={pointer.lng}
                        stationName={name}
                      />
                    )}
                  </div>
                  <div className="w-full lg:md:2/3 flex flex-col gap-3"></div>
                  <div className="flex items-center flex-col w-full h-full justify-center p-6 border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 w-full background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setOnCancel(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setOnProceed(true)}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default BookPreview;
