import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel = {} } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  const handlePayment = async () => {
    const bdtToUSDT = parcel.cost / 100;
    const paymentInfo = {
      cost: bdtToUSDT,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  return (
    <div className="w-full flex justify-center py-16 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 border border-base-300">
        {/* Title */}
        <h1 className="text-2xl font-bold text-base-content">
          Complete Your Payment
        </h1>
        <p className="mt-2 text-base-content/70 text-sm">
          Please review your parcel details before proceeding.
        </p>

        {/* Parcel Info Box */}
        <div className="mt-6 p-5 bg-base-200 rounded-xl border border-base-300">
          <h2 className="text-lg font-semibold text-base-content">
            Parcel Name:{" "}
            <span className="text-primary font-bold capitalize">
              {parcel.parcelName}
            </span>
          </h2>

          <p className="text-base-content mt-2">
            Total Cost:{" "}
            <span className="text-accent font-bold text-xl">
              {parcel.cost} BDT
            </span>
          </p>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="w-full btn bg-primary text-white mt-8 text-lg font-semibold shadow-none hover:bg-primary/90 border-none ">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
