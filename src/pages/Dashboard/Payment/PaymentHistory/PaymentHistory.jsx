import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-base-content">
        All Payment History ({payments.length})
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>No</th>
              <th>Transaction ID</th>
              <th>Parcel ID</th>
              <th>Amount</th>
              <th>Customer Email</th>
              <th>Paid At</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {payments?.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>

                {/* Transaction ID */}
                <td className="font-medium text-primary">
                  {payment.transactionId}
                </td>

                {/* Parcel ID */}
                <td className="uppercase">{payment.parcelId}</td>

                {/* Amount */}
                <td className="font-semibold">
                  {payment.amount} {payment.currency?.toUpperCase()}
                </td>

                {/* Customer Email */}
                <td>{payment.customerEmail}</td>

                {/* Paid At */}
                <td>
                  {payment.paidAt
                    ? new Date(payment.paidAt).toLocaleString()
                    : "N/A"}
                </td>

                {/* Payment Status */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm border ${
                      payment.paymentStatus === "paid"
                        ? "bg-accent/10 border-accent/30 "
                        : "bg-error/10 border-error/30"
                    }`}>
                    {payment.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}

            {/* If no payment history */}
            {payments.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-base-content/60">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
