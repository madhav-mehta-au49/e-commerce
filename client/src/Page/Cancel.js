import React from "react";
import { useNavigate } from "react-router-dom";

function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mx-4">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-[red] font-bold mb-4 text-center">
          Payment Cancelled
        </h2>
        <p className="text-gray-600 mb-6 text-lg text-center">
          Your payment has been cancelled. If you have any questions or need
          further assistance, please contact our support team.
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default Cancel;
