import React from "react";
import Checkout from "./Checkout";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

        <form>
          <label className="block mb-2 text-sm">Name</label>
          <input
            type="text"
            className="w-full border rounded-md p-2 mb-4"
            placeholder="John Doe"
          />

          <label className="block mb-2 text-sm">Address</label>
          <input
            type="text"
            className="w-full border rounded-md p-2 mb-4"
            placeholder="123 Main St"
          />

          <label className="block mb-2 text-sm">Credit Card Number</label>
          <input
            type="text"
            className="w-full border rounded-md p-2 mb-4"
            placeholder="**** **** **** 1234"
          />

          <div className="flex justify-between">
            <div className="w-1/2 pr-2">
              <label className="block mb-2 text-sm">Expiration Date</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="MM/YY"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block mb-2 text-sm">CVV</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="123"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-6 w-full"
          >
            Place Order
          </button>
        </form>
          </div>
          {/* <Checkout/> */}
    </div>
  );
};

export default CheckoutPage;
