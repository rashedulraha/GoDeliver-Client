import React from "react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-base-content">
        Your payment is cancelled please try again <br />
        <Link to={"/dashboard/my-parcels"}>
          <button className="btn btn-sm bg-primary shadow-none border-none">
            Try again
          </button>
        </Link>
      </h1>
    </div>
  );
};

export default PaymentCancel;
