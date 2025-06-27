import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const Success = ({ message, setOpenSuccess }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto">
        <div className="flex flex-col items-center text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Success!</h3>
          <p className="text-gray-600">{message}</p>
          <button
            onClick={() => setOpenSuccess(false)}
            className="mt-6 inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-500 hover:bg-green-600 focus:shadow-outline focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success; 