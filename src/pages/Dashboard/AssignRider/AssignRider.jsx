import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import LoadingSpinner from "../../Shared/Loading/LoadingSpinner";
import { toast } from "react-toastify";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const openModal = useRef();
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    isLoading,
    refetch,
    data: parcels = [],
  } = useQuery({
    queryKey: ["parcels", "delivery-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliveryStatus=pending-pickup`
      );
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["rider", selectedParcel?.senderDistrict, "Available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider?status=approve&district=${selectedParcel?.senderDistrict}&workStatus=Available`
      );
      return res.data;
    },
  });

  const handleAssignRider = (parcel) => {
    setSelectedParcel(parcel);
    openModal.current?.showModal();
  };

  const handleRiderAssign = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.firstName,
      parcelId: selectedParcel._id,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          openModal.current?.close();
          toast.success("rider has assign");
        }
      });
  };

  if (isLoading)
    return (
      <>
        <LoadingSpinner />
      </>
    );

  return (
    <div className="py-6">
      {/* Page Header */}
      <div className="card bg-base-100 ">
        <div className="card-body">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-base-content">
                Assign Rider
              </h2>
              <p className="text-base-content/70 mt-1">
                Assign riders to pending pickup parcels
              </p>
            </div>
            <div className="text-base-content">
              Total: {parcels?.length} parcels
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-base-100 shadow-lg overflow-hidden mt-6">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="bg-base-200">
                <tr>
                  <th className="text-base-content">#</th>
                  <th className="text-base-content">Transaction ID</th>
                  <th className="text-base-content">Sender Name</th>
                  <th className="text-base-content">Parcel Weight</th>
                  <th className="text-base-content">Pickup District</th>
                  <th className="text-base-content">Phone Number</th>
                  <th className="text-base-content">Date</th>
                  <th className="text-base-content">Cost</th>
                  <th className="text-base-content">Status</th>
                  <th className="text-base-content">Action</th>
                </tr>
              </thead>

              <tbody>
                {parcels?.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-10">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="text-5xl text-base-content/30">📦</div>
                        <h3 className="text-xl font-semibold text-base-content/70">
                          No pending parcels
                        </h3>
                        <p className="text-base-content/50">
                          There are no parcels waiting for rider assignment
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  parcels?.map((parcel, index) => (
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
                              navigator.clipboard.writeText(parcel.trackingId)
                            }
                            title="Copy to clipboard">
                            📋
                          </button>
                        </div>
                      </td>

                      {/* Sender name */}
                      <td className="font-medium text-base-content">
                        {parcel.senderName}
                      </td>

                      {/* Parcel Weight */}
                      <td className="font-semibold text-base-content">
                        {parcel.parcelWeight}
                        <span className="text-sm font-normal">kg</span>
                      </td>

                      {/* Pickup District */}
                      <td className="text-base-content">
                        {parcel.senderDistrict}
                      </td>

                      {/* Phone Number */}
                      <td className="text-base-content">
                        {parcel.senderPhoneNumber}
                      </td>

                      {/* Date */}
                      <td className="text-base-content">
                        {parcel.createAt
                          ? new Date(parcel.createAt).toLocaleDateString()
                          : "N/A"}
                        <div className="text-xs text-base-content/60">
                          {parcel.createAt
                            ? new Date(parcel.createAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </div>
                      </td>

                      {/* Cost */}
                      <td className="font-semibold text-base-content">
                        {parcel.cost}{" "}
                        <span className="text-sm font-normal">
                          {parcel.currency?.toUpperCase()}
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        <span className="badge badge-warning text-warning-content">
                          {parcel.deliveryStatus}
                        </span>
                      </td>

                      {/* Action */}
                      <td>
                        <button
                          onClick={() => handleAssignRider(parcel)}
                          className="btn btn-sm bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
                          Find Rider
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog ref={openModal} className="modal">
        <div className="modal-box max-w-4xl bg-base-100 border border-base-300 shadow-xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content"
            onClick={() => {
              openModal.current?.close();
              setSelectedParcel(null);
              setSelectedRider(null);
            }}>
            ✕
          </button>

          <h3 className="font-bold text-2xl text-center mb-6 text-primary">
            Available Riders for {selectedParcel?.trackingId}
          </h3>

          <div className="mb-4 p-4 bg-base-200 rounded-lg">
            <p className="text-sm text-base-content/70">Parcel Details</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div>
                <p className="text-xs text-base-content/60">Sender</p>
                <p className="font-medium">{selectedParcel?.senderName}</p>
              </div>
              <div>
                <p className="text-xs text-base-content/60">Pickup District</p>
                <p className="font-medium">{selectedParcel?.senderDistrict}</p>
              </div>
              <div>
                <p className="text-xs text-base-content/60">Weight</p>
                <p className="font-medium">{selectedParcel?.parcelWeight} kg</p>
              </div>
              <div>
                <p className="text-xs text-base-content/60">Cost</p>
                <p className="font-medium">
                  {selectedParcel?.cost}{" "}
                  {selectedParcel?.currency?.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {riders?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="text-5xl text-base-content/30 mb-4">🛵</div>
              <h3 className="text-xl font-semibold text-base-content/70">
                No available riders
              </h3>
              <p className="text-base-content/50">
                There are no available riders in this district
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Vehicle</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {riders?.map((rider, index) => (
                    <tr
                      key={rider._id}
                      className={`${
                        selectedRider?._id === rider._id ? "bg-primary/10" : ""
                      }`}>
                      <th>{index + 1}</th>
                      <td className="font-medium">
                        {rider?.firstName} {rider?.lastName}
                      </td>
                      <td>{rider.email}</td>
                      <td>{rider?.phoneNumber}</td>
                      <td>{rider?.vehicle}</td>
                      <td>
                        <button
                          onClick={() => {
                            setSelectedRider(rider);
                            handleRiderAssign(rider);
                          }}
                          className={`btn btn-sm ${
                            selectedRider?._id === rider._id
                              ? "btn-success text-success-content"
                              : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                          }`}>
                          {selectedRider?._id === rider._id ? (
                            <>
                              <span className="loading loading-spinner loading-xs mr-1"></span>
                              Assigning...
                            </>
                          ) : (
                            "Assign"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => {
            setSelectedParcel(null);
            setSelectedRider(null);
          }}>
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AssignRider;
