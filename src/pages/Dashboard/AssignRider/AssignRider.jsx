import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  Bike,
  Package,
  User,
  Phone,
  MapPin,
  DollarSign,
  Copy,
} from "lucide-react";
import Container from "../../Responsive/Container";
import { toast } from "react-toastify";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const modalRef = useRef();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  const { data: riders = [], isFetching: loadingRiders } = useQuery({
    queryKey: ["available-riders", selectedParcel?.senderDistrict],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider?status=approve&district=${selectedParcel?.senderDistrict}&workStatus=Available`
      );
      return res.data;
    },
    enabled: !!selectedParcel,
  });

  const handleAssignRider = async (rider) => {
    const assignData = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: `${rider.firstName} ${rider.lastName || ""}`.trim(),
      parcelId: selectedParcel._id,
      deliveryStatus: "picked-up",
    };

    try {
      const res = await axiosSecure.patch(
        `/parcels/${selectedParcel._id}`,
        assignData
      );

      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`Rider ${assignData.riderName} assigned successfully!`);
        modalRef.current?.close();
        setSelectedParcel(null);
      }
    } catch (error) {
      toast.error("Failed to assign rider", error);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-32">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">
            Loading pending parcels...
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="py-10 lg:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between ">
          {/* Header */}
          <div className="mb-6 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-base-content mb-6">
              Assign <span className="text-primary">Rider</span>
            </h1>
            <p className="text-lg text-base-content/70">
              Assign available riders to parcels waiting for pickup
            </p>
          </div>

          {/* Stats */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full border border-primary/30">
              <Package className="w-6 h-6 text-primary" />
              <span className="text-2xl font-bold text-primary">
                {parcels.length}
              </span>
              <span className="text-base-content/80">
                Pending Pickup Parcels
              </span>
            </div>
          </div>
        </div>
        {/* Parcels Table */}
        <div className="bg-base-100 rounded-md border border-base-300 overflow-hidden">
          <div className="p-6 border-b border-base-300 bg-base-200/50">
            <h2 className="text-2xl font-bold text-base-content">
              Parcels Awaiting Rider Assignment
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
                  <th>Tracking ID</th>
                  <th>Sender</th>
                  <th>Weight</th>
                  <th>Pickup Area</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {parcels.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-20">
                      <div className="flex flex-col items-center gap-6">
                        <Package className="w-20 h-20 text-base-content/20" />
                        <h3 className="text-2xl font-bold text-base-content/60">
                          No pending pickup parcels
                        </h3>
                        <p className="text-base-content/50">
                          All parcels have been assigned or are in transit
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  parcels.map((parcel, index) => (
                    <tr key={parcel._id} className="hover">
                      <td>{index + 1}</td>
                      <td className="font-mono">
                        <div className="flex items-center gap-2">
                          <code className="text-primary bg-primary/10 px-2 py-1 rounded text-sm">
                            {parcel.trackingId}
                          </code>
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(parcel.trackingId)
                            }
                            className="text-primary hover:text-primary/70"
                            title="Copy">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="font-medium">{parcel.senderName}</td>
                      <td>{parcel.parcelWeight} kg</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-base-content/60" />
                          {parcel.senderDistrict}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-base-content/60" />
                          {parcel.senderPhoneNumber}
                        </div>
                      </td>
                      <td>
                        {new Date(parcel.createAt).toLocaleDateString()}
                        <div className="text-xs text-base-content/60">
                          {new Date(parcel.createAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td className="text-lg font-bold text-primary">
                        ${parcel.cost}
                      </td>
                      <td>
                        <span className="badge badge-warning badge-lg font-medium">
                          Pending Pickup
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => {
                            setSelectedParcel(parcel);
                            modalRef.current?.showModal();
                          }}
                          className="btn btn-primary btn-sm rounded-full px-6 shadow-none hover:shadow-lg hover:shadow-primary/20 transition-all">
                          <Bike className="w-4 h-4" />
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

        {/* Rider Selection Modal */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100 border border-base-300 rounded-md shadow-xl max-w-5xl">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
                Close
              </button>
            </form>

            {selectedParcel && (
              <>
                <h3 className="text-3xl font-bold text-center mb-8 text-primary">
                  Assign Rider for Parcel
                </h3>

                {/* Parcel Summary */}
                <div className="bg-base-200/50 border border-base-300 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-base-content mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" /> Parcel Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-base-content/60">
                        Tracking ID
                      </p>
                      <p className="font-bold text-primary">
                        {selectedParcel.trackingId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60">Sender</p>
                      <p className="font-bold">{selectedParcel.senderName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60">District</p>
                      <p className="font-bold flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {selectedParcel.senderDistrict}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60">Amount</p>
                      <p className="font-bold text-primary flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {selectedParcel.cost}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Available Riders */}
                <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <Bike className="w-6 h-6 text-primary" />
                  Available Riders in {selectedParcel.senderDistrict}
                </h4>

                {loadingRiders ? (
                  <div className="text-center py-12">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </div>
                ) : riders.length === 0 ? (
                  <div className="text-center py-16">
                    <Bike className="w-20 h-20 text-base-content/20 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-base-content/60">
                      No riders available right now
                    </p>
                    <p className="text-base-content/50 mt-2">
                      Try again later or check other districts
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {riders.map((rider) => (
                      <div
                        key={rider._id}
                        className="bg-base-200/50 border border-base-300 rounded-xl p-6 hover:border-primary transition-all cursor-pointer"
                        onClick={() => handleAssignRider(rider)}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="avatar">
                            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img
                                src={
                                  rider.photoURL ||
                                  "https://i.ibb.co.com/0jrg565/avatar.jpg"
                                }
                                alt="Rider"
                              />
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold text-lg">
                              {rider.firstName} {rider.lastName || ""}
                            </h5>
                            <p className="text-sm text-base-content/70">
                              {rider.vehicle}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <User className="w-4 h-4 text-base-content/60" />
                            {rider.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-base-content/60" />
                            {rider.phoneNumber}
                          </p>
                        </div>

                        <button className="btn btn-primary w-full mt-5 rounded-full">
                          Assign This Rider
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </dialog>
      </section>
    </Container>
  );
};

export default AssignRider;
