import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="w-full h-[80vh] flex items-center justify-center px-4">
      <div className="bg-base-100 max-w-md w-full shadow-xl p-10 rounded-2xl border border-base-300 text-center">
        <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-base-content">
          Payment Successful!
        </h1>

        <p className="mt-2 text-base-content/70">
          Your payment has been processed successfully.
        </p>

        <div className="mt-6 p-5 bg-base-200 rounded-xl border border-base-300 text-left">
          <p className="font-semibold text-base-content">Transaction ID:</p>
          <p className="text-primary font-bold break-all">
            {paymentInfo.transactionId || "Loading..."}
          </p>

          <p className="font-semibold text-base-content mt-4">Tracking ID:</p>
          <p className="text-accent font-bold break-all">
            {paymentInfo.trackingId || "Loading..."}
          </p>
        </div>

        <Link to="/dashboard/my-parcels">
          <button className="btn bg-primary text-white mt-8 w-full shadow-none border-none hover:bg-primary/90">
            View My Parcels
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
