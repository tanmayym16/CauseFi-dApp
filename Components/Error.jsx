import React from "react";

const Error = ({ error, setOpenError }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setOpenError(false)}
    >
      <div
        className="relative p-4 mx-auto bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-3">
          <p className="text-2xl font-bold">Error!</p>
          <button
            className="text-black close-modal"
            onClick={() => setOpenError(false)}
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Error; 