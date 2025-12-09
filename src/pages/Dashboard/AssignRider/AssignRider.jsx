import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Eye } from "lucide-react";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const openModal = useRef();
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "delivery-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliveryStatus=pending-pickup`
      );
      return res.data;
    },
  });

  const handleAssignRider = () => {
    openModal.current.showModal();
  };
  return (
    <div>
      <h2 className="text-2xl">Assign rider: {parcels?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th className="text-base-content">#</th>
              <th className="text-base-content">Transaction ID</th>
              <th className="text-base-content">Sender Name</th>
              <th className="text-base-content">Parcel Weight</th>
              <th className="text-base-content">Phone Number</th>
              <th className="text-base-content">Date</th>
              <th className="text-base-content">const</th>
              <th className="text-base-content">Status</th>
              <th className="text-base-content">Rider Assign</th>
            </tr>
          </thead>

          <tbody>
            {parcels?.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="hover:bg-base-200/50 transition-colors">
                <th className="text-base-content">{index + 1}</th>

                {/* Transaction ID */}
                <td className="font-mono text-primary">
                  <div className="flex items-center">
                    <span className="truncate max-w-[120px]">
                      {parcel.trackingId}
                    </span>
                    <button
                      className="ml-1 opacity-0 hover:opacity-100 transition-opacity"
                      onClick={() =>
                        navigator.clipboard.writeText(parcel.transactionId)
                      }
                      title="Copy to clipboard">
                      📋
                    </button>
                  </div>
                </td>

                {/* sender name */}
                <td className="font-mono text-sm text-base-content/80 uppercase">
                  {parcel.senderName}
                </td>

                {/* Amount */}
                <td className="font-semibold text-base-content">
                  {parcel.amount}{" "}
                  <span className="text-sm font-normal">
                    {parcel.currency?.toUpperCase()}
                  </span>
                </td>

                {/* Customer Email */}
                <td className="text-base-content">
                  {parcel.senderPhoneNumber}
                </td>

                {/* Paid At */}
                <td className="text-base-content">
                  {parcel.paidAt
                    ? new Date(parcel.createAt).toLocaleDateString()
                    : "N/A"}
                  <div className="text-xs text-base-content/60">
                    {parcel.paidAt
                      ? new Date(parcel.paidAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </div>
                </td>
                <td>{parcel.deliveryStatus}</td>
                {/* Customer cost */}
                <td className="text-base-content">{parcel.cost}</td>

                {/* parcel Status */}
                <td>
                  <button
                    onClick={handleAssignRider}
                    className="btn btn-sm shadow-none bg-accent border-none">
                    Assign rider
                  </button>
                </td>
              </tr>
            ))}

            {/* If no parcel history */}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-10">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="text-5xl text-base-content/30">💳</div>
                    <h3 className="text-xl font-semibold text-base-content/70">
                      No parcel history
                    </h3>
                    <p className="text-base-content/50">
                      You haven't made any parcels yet
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={openModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
