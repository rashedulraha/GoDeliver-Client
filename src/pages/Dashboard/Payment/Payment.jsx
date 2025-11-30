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

  return (
    <div>
      <h1>please pay {parcel.parcelName}</h1>
    </div>
  );
};

export default Payment;
