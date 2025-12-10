import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Eye, CreditCard, CheckCircle2, XCircle } from "lucide-react";
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

  if (isLoading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-32">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">
            Loading payment history...
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="py-10 lg:py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-base-content mb-6">
            Payment <span className="text-primary">History</span>
          </h1>
          <p className="text-lg text-base-content/70">
            Track all your successful payments and parcel transactions
          </p>
        </div>

        {/* Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-base-200/50 border border-base-300 rounded-lg p-6 text-center">
            <CreditCard className="w-12 h-12 text-primary mx-auto mb-3" />
            <p className="text-3xl font-bold text-base-content">
              {payments.length}
            </p>
            <p className="text-base-content/70">Total Transactions</p>
          </div>
          <div className="bg-success/10 border border-success/30 rounded-lg p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
            <p className="text-3xl font-bold text-success">
              {payments.filter((p) => p.paymentStatus === "paid").length}
            </p>
            <p className="text-success/80">Successful</p>
          </div>
          <div className="bg-error/10 border border-error/30 rounded-lg p-6 text-center">
            <XCircle className="w-12 h-12 text-error mx-auto mb-3" />
            <p className="text-3xl font-bold text-error">
              {payments.filter((p) => p.paymentStatus !== "paid").length}
            </p>
            <p className="text-error/80">Failed</p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-base-100 rounded-md border border-base-300 overflow-hidden">
          <div className="p-6 border-b border-base-300 bg-base-200/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-base-content">
                Transaction Records
              </h2>
              <span className="text-base-content/70">
                {payments.length} {payments.length === 1 ? "record" : "records"}{" "}
                found
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
                  <th>Transaction ID</th>
                  <th>Parcel ID</th>
                  <th>Amount</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Delivery</th>
                  <th className="text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-20">
                      <div className="flex flex-col items-center gap-6">
                        <CreditCard className="w-20 h-20 text-base-content/20" />
                        <h3 className="text-2xl font-bold text-base-content/60">
                          No Payment History
                        </h3>
                        <p className="text-base-content/50 max-w-sm">
                          When you make a payment for a parcel, it will appear
                          here
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  payments.map((payment, index) => (
                    <tr key={payment._id} className="hover">
                      <td>{index + 1}</td>

                      <td className="font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <code className="text-primary bg-primary/10 px-2 py-1 rounded">
                            {payment.transactionId}
                          </code>
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(
                                payment.transactionId
                              )
                            }
                            className="text-primary hover:text-primary/70 text-xs"
                            title="Copy">
                            Copy
                          </button>
                        </div>
                      </td>

                      <td className="font-mono text-xs uppercase text-base-content/70">
                        {payment.parcelId}
                      </td>

                      <td className="text-lg font-bold text-primary">
                        ${payment.amount}
                      </td>

                      <td>
                        <div className="text-sm">
                          <div>
                            {new Date(payment.paidAt).toLocaleDateString()}
                          </div>
                          <div className="text-base-content/60">
                            {new Date(payment.paidAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </td>

                      <td>
                        {payment.paymentStatus === "paid" ? (
                          <span className="badge badge-success badge-lg font-medium">
                            Paid
                          </span>
                        ) : (
                          <span className="badge badge-error badge-lg font-medium">
                            Failed
                          </span>
                        )}
                      </td>

                      <td>
                        <span
                          className={`badge badge-outline ${
                            payment.deliveryStatus === "Delivered"
                              ? "badge-success text-success"
                              : payment.deliveryStatus === "Cancelled"
                              ? "badge-error text-error"
                              : "badge-warning text-warning"
                          }`}>
                          {payment.deliveryStatus || "Pending"}
                        </span>
                      </td>

                      <td className="text-center">
                        <button
                          className="btn btn-sm shadow-none bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 tooltip"
                          data-tip="View Parcel Details">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default PaymentHistory;
