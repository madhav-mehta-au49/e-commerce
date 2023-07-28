import React from "react";
import successImg from "../images/success.gif";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center my-10 bg-gray-100">
        <div className="w-full sm:max-w-sm bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center justify-center ">
            <img className="w-full max-w-full" src={successImg} alt="Success" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mt-4 text-center">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2 mx-2 text-center">
            Thank you for your purchase.
          </p>
          <button
            onClick={() => navigate("/menu/64b7bdc79d0431530efabc46")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold mt-4 px-4 py-2 rounded w-full"
          >
            Continue Shopping
          </button>
        </div>
      </div>
      );
    </>
  );
}

export default Success;
