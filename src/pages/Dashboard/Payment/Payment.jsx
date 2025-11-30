import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel = [] } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${parcelId}`);

      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full  flex items-center justify-center">
        <span className="loading loading-dots loading-md"></span>;
      </div>
    );
  }

  // !  handle payment

  const handlePayment = async () => {
    const bdtToUSDT = parcel.cost / 100;
    const paymentInfo = {
      cost: bdtToUSDT,
      senderEmail: parcel.senderEmail,
      parcelId: parcel.parcelsId,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  return (
    <div>
      <h1>
        please {parcel.cost} pay your parcel name is {parcel.parcelName}
      </h1>
      <button
        onClick={handlePayment}
        className="btn btn-sm bg-primary shadow-none outline-none border-none">
        pay
      </button>
    </div>
  );
};

export default Payment;
