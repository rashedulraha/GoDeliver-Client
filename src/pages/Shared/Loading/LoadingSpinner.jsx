import React from "react";
import { BarLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 absolute z-999 bg-base-200 inset-0 h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
      <h2 className="text-center text-lg font-medium text-base-content">
        Please wait ...
      </h2>
    </div>
  );
};

export default LoadingSpinner;
