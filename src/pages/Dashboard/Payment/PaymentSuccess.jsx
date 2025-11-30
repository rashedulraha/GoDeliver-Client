import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          console.log(sessionId);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-base-content">
        Payment successfully completed
      </h1>
    </div>
  );
};

export default PaymentSuccess;
