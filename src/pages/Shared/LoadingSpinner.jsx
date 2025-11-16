import React from "react";
import { BarLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center  h-screen z-50 absolute top-0 inset-0 bg-base-200">
      <BarLoader color="#ff6b35" />
    </div>
  );
};

export default LoadingSpinner;
