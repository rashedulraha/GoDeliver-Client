import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Edit, Trash2, Eye, Package } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CgAdd } from "react-icons/cg";
import Container from "../../Responsive/Container";

const MyParcels = () => {
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();

  const {
    data: MyParcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "var(--color-base-100)",
      color: "var(--color-base-content)",
      confirmButtonColor: "var(--color-error)",
      cancelButtonColor: "var(--color-accent)",
      customClass: {
        popup: "rounded-md border border-base-300",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcel/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            toast.success("Parcel deleted successfully!");
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-32">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading your parcels...</p>
        </div>
      </Container>
    );
  }

  return (
    <section className="py-10 lg:py-16">
      <div className="flex items-center justify-between">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-base-content mb-6">
            My <span className="text-primary">Parcels</span>
          </h1>
          <p className="text-lg text-base-content/70">
            Manage all your parcel booking history in one place
          </p>
        </div>
        {/* Add New Parcel Button */}
        <div className="text-center mb-8">
          <Link
            to="/send-parcel"
            className="btn btn-primary rounded-full px-10 shadow-none hover:shadow-md:hover:shadow-lg transition-all group">
            <CgAdd className="w-6 h-6 group-hover:scale-110 transition" />
            Book a New Parcel
          </Link>
        </div>
      </div>
      {/* Parcels Table Card */}
      <div className="bg-base-100 rounded-md border border-base-300 overflow-hidden">
        <div className="p-6 border-b border-base-300 bg-base-200/50">
          <h2 className="text-2xl font-bold text-base-content">
            Parcel History ({MyParcels.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Parcel Name</th>
                <th>Weight</th>
                <th>Receiver</th>
                <th>Delivery Address</th>
                <th>Booking Date</th>
                <th>Payment Status</th>
                <th>Cost</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MyParcels.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-20">
                    <div className="flex flex-col items-center gap-6">
                      <Package className="w-20 h-20 text-base-content/20" />
                      <h3 className="text-2xl font-bold text-base-content/60">
                        No parcels booked yet
                      </h3>
                      <p className="text-base-content/50">
                        Start by booking your first parcel
                      </p>
                      <Link
                        to="/send-parcel"
                        className="btn btn-primary rounded-full px-8 shadow-none">
                        <CgAdd className="w-5 h-5" />
                        Book Your First Parcel
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                MyParcels.map((parcel, index) => (
                  <tr key={parcel._id} className="hover">
                    <td>{index + 1}</td>
                    <td className="font-medium text-base-content">
                      {parcel.parcelName || "General Parcel"}
                    </td>
                    <td>{parcel.parcelWeight} kg</td>
                    <td>{parcel.receiverName}</td>
                    <td
                      className="max-w-xs truncate"
                      title={parcel.receiverAddress}>
                      {parcel.receiverAddress}
                    </td>
                    <td>
                      {parcel.createAt
                        ? new Date(parcel.createAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {parcel.paymentStatus === "paid" ? (
                        <span className="badge badge-success badge-lg">
                          Paid
                        </span>
                      ) : (
                        <Link
                          to={`/dashboard/payment/${parcel._id}`}
                          className="btn btn-sm btn-outline btn-accent rounded-full text-xs px-4">
                          Pay Now
                        </Link>
                      )}
                    </td>
                    <td className="text-lg font-bold text-primary">
                      ${parcel.cost}
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        {/* Edit Button */}
                        <Link
                          to={`/dashboard/update-parcel/${parcel._id}`}
                          className="btn btn-sm shadow-none bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 tooltip"
                          data-tip="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>

                        {/* View Button */}
                        <button
                          className="btn btn-sm shadow-none bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 tooltip"
                          data-tip="View Details">
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleParcelDelete(parcel._id)}
                          className="btn btn-sm shadow-none bg-error/10 text-error border-error/30 hover:bg-error/20 tooltip"
                          data-tip="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyParcels;
