import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const userEmail = user.email;

  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${userEmail}`);
      return res.data;
    },
  });

  return (
    <div>
      <h1>all of my parcels{parcels.length}</h1>
    </div>
  );
};

export default MyParcels;
