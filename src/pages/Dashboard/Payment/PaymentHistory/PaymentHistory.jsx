import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Eye } from "lucide-react";
import Container from "../../../Responsive/Container";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <h2 className="text-center text-lg font-medium text-base-content">
            Loading users...
          </h2>
        </div>
      </Container>
    );

  return (
    <div className="card bg-base-100 shadow-lg ">
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-base-content">
            Payment History
          </h2>{" "}
          <span className="text-base-content">
            {payments.length} {payments.length === 1 ? "Record" : "Records"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-base-200">
              <tr>
                <th className="text-base-content">#</th>
                <th className="text-base-content">Transaction ID</th>
                <th className="text-base-content">Parcel ID</th>
                <th className="text-base-content">Amount</th>
                <th className="text-base-content">Email</th>
                <th className="text-base-content">Date</th>
                <th className="text-base-content">Preview</th>
                <th className="text-base-content">Status</th>
                <th className="text-base-content">Delivery Status</th>
              </tr>
            </thead>

            <tbody>
              {payments?.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-base-200/50 transition-colors">
                  <th className="text-base-content">{index + 1}</th>

                  {/* Transaction ID */}
                  <td className="font-mono text-primary">
                    <div className="flex items-center">
                      <span className="truncate max-w-[120px]">
                        {payment.transactionId}
                      </span>
                      <button
                        className="ml-1 opacity-0 hover:opacity-100 transition-opacity"
                        onClick={() =>
                          navigator.clipboard.writeText(payment.transactionId)
                        }
                        title="Copy to clipboard">
                        📋
                      </button>
                    </div>
                  </td>

                  {/* Parcel ID */}
                  <td className="font-mono text-sm text-base-content/80 uppercase">
                    {payment.parcelId}
                  </td>

                  {/* Amount */}
                  <td className="font-semibold text-base-content">
                    {payment.amount}{" "}
                    <span className="text-sm font-normal">
                      {payment.currency?.toUpperCase()}
                    </span>
                  </td>

                  {/* Customer Email */}
                  <td className="text-base-content">{payment.customerEmail}</td>

                  {/* Paid At */}
                  <td className="text-base-content">
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString()
                      : "N/A"}
                    <div className="text-xs text-base-content/60">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </div>
                  </td>

                  {/* Preview parcel details */}
                  <td>
                    <button
                      className="btn btn-sm btn-circle bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 tooltip"
                      data-tip="View Parcel Details">
                      <Eye size={16} />
                    </button>
                  </td>

                  {/* Payment Status */}
                  <td>
                    {payment.paymentStatus === "paid" ? (
                      <span className="badge badge-success gap-2">
                        <span className="w-2 h-2 rounded-full bg-success-content"></span>
                        Paid
                      </span>
                    ) : (
                      <span className="badge badge-error gap-2">
                        <span className="w-2 h-2 rounded-full bg-error-content"></span>
                        Failed
                      </span>
                    )}
                  </td>
                  <td>{payment.deliveryStatus}</td>
                </tr>
              ))}

              {/* If no payment history */}
              {payments.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-10">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="text-5xl text-base-content/30">💳</div>
                      <h3 className="text-xl font-semibold text-base-content/70">
                        No payment history
                      </h3>
                      <p className="text-base-content/50">
                        You haven't made any payments yet
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
