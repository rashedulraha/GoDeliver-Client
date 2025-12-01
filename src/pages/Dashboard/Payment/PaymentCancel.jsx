import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentCancel = () => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center px-4">
      <div className="bg-base-100 max-w-md w-full shadow-xl p-10 rounded-md border border-base-300 text-center">
        <XCircle className="w-16 h-16 text-error mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-base-content">
          Payment Cancelled
        </h1>

        <p className="mt-2 text-base-content/70">
          Your payment was unsuccessful. Please try again.
        </p>

        <Link to={"/dashboard/my-parcels"}>
          <button className="btn bg-primary text-white mt-6 w-full shadow-none border-none hover:bg-primary/90">
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
