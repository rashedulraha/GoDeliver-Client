import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Edit, TrashIcon, View } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CgAdd } from "react-icons/cg";

const MyParcels = () => {
  const { user } = useAuth();
  const email = user?.email;

  const axiosSecure = useAxiosSecure();

  const { data: MyParcels = [], refetch } = useQuery({
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
      background: "var(--color-base-200)",
      color: "var(--color-base-content)",
      showCancelButton: true,
      confirmButtonColor: "var(--color-error)",
      cancelButtonColor: "var(--color-accent)",
      confirmButtonText: "Yes, delete parcel",
      customClass: {
        popup: "border border-base-300",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcel/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            toast.success("Your parcel request has been deleted", {
              style: {
                background: "var(--color-base-200)",
                color: "var(--color-base-content)",
              },
            });
          }
        });
      }
    });
  };

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-base-content">My Parcels</h2>
          <Link
            to={"/send-parcel"}
            className="btn bg-primary text-primary-content border-primary hover:bg-primary-focus transition-all">
            <CgAdd size={21} /> Add New Parcel
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-base-200">
              <tr>
                <th className="text-base-content">No</th>
                <th className="text-base-content">Parcel Name</th>
                <th className="text-base-content">Weight</th>
                <th className="text-base-content">Receiver</th>
                <th className="text-base-content">Location</th>
                <th className="text-base-content">Date</th>
                <th className="text-base-content">Payment</th>
                <th className="text-base-content">Actions</th>
                <th className="text-base-content">Cost</th>
              </tr>
            </thead>

            <tbody>
              {MyParcels?.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-base-200/50 transition-colors">
                  <th className="text-base-content">{index + 1}</th>
                  <td className="text-base-content font-medium">
                    {parcel.parcelName}
                  </td>
                  <td className="text-base-content">
                    {parcel.parcelWeight} kg
                  </td>
                  <td className="text-base-content">{parcel.receiverName}</td>
                  <td className="text-base-content">
                    {parcel.receiverAddress}
                  </td>

                  {/* Date formatting */}
                  <td className="text-base-content">
                    {parcel.createAt
                      ? new Date(parcel.createAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    {parcel.paymentStatus === "paid" ? (
                      <span className="badge badge-success text-success-content gap-2">
                        Paid
                      </span>
                    ) : (
                      <Link
                        to={`/dashboard/payment/${parcel._id}`}
                        className="btn btn-sm bg-accent text-accent-content border-accent hover:bg-accent-focus transition-all">
                        Pay Now
                      </Link>
                    )}
                  </td>

                  {/* Responsive Action Buttons */}
                  <td>
                    <div className="flex gap-2">
                      <button
                        data-tip="Edit Parcel"
                        className="btn btn-sm btn-circle bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 tooltip">
                        <Edit size={14} />
                      </button>

                      <button
                        data-tip="View Details"
                        className="btn btn-sm btn-circle bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 tooltip">
                        <View size={14} />
                      </button>

                      <button
                        onClick={() => handleParcelDelete(parcel._id)}
                        data-tip="Delete Parcel"
                        className="btn btn-sm btn-circle bg-error/10 text-error border-error/30 hover:bg-error/20 tooltip">
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </td>

                  <td className="font-semibold text-base-content">
                    ${parcel.cost}
                  </td>
                </tr>
              ))}

              {/* If no parcels history */}
              {MyParcels.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-10">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="text-5xl text-base-content/30">📦</div>
                      <h3 className="text-xl font-semibold text-base-content/70">
                        No parcels found
                      </h3>
                      <p className="text-base-content/50">
                        You haven't created any parcel requests yet
                      </p>
                      <Link
                        to={"/send-parcel"}
                        className="mt-2 btn bg-primary text-primary-content border-primary hover:bg-primary-focus transition-all">
                        <CgAdd size={21} /> Create Your First Parcel
                      </Link>
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

export default MyParcels;
