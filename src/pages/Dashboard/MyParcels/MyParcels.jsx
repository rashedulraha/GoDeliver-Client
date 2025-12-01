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
      background: "#1e293b",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: "#f87171",
      cancelButtonColor: "#14b8a6",
      confirmButtonText: "Yes, delete parcel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcel/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            toast.success("Your parcel request has been deleted");
          }
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-md">
        <thead>
          <tr>
            <th>No</th>
            <th>Parcel Name</th>
            <th>Parcel Weight</th>
            <th>Receiver Name</th>
            <th>Receiver Location</th>
            <th>Send Date</th>
            <th>Pay</th>
            <th>Action</th>
            <th>Cost</th>
          </tr>
        </thead>

        <tbody>
          {MyParcels?.map((parcel, index) => (
            <tr key={parcel._id} className="capitalize">
              <th>{index + 1}</th>
              <td>{parcel.parcelName}</td>
              <td>{parcel.parcelWeight}</td>
              <td>{parcel.receiverName}</td>
              <td>{parcel.receiverAddress}</td>

              {/* Date formatting */}
              <td>
                {parcel.createAt
                  ? new Date(parcel.createAt).toLocaleDateString()
                  : "N/A"}
              </td>

              <td>
                {parcel.paymentStatus === "paid" ? (
                  <span className="text-base-content bg-accent/10 border border-accent/30 btn-sm btn shadow-none w-full cursor-not-allowed">
                    Paid
                  </span>
                ) : (
                  <Link
                    to={`/dashboard/payment/${parcel._id}`}
                    className="text-base-content bg-accent border border-accent btn-sm btn shadow-none w-full">
                    Pay
                  </Link>
                )}
              </td>

              {/* Responsive Action Buttons */}
              <td>
                <div className="flex flex-col lg:flex-row gap-2">
                  <button
                    data-tip="Parcel Edit"
                    className="btn btn-sm btn-square shadow-none rounded-sm bg-primary/10 text-base-content border-primary/30 border cursor-pointer hover:bg-primary transition-all tooltip">
                    <Edit size={12} />
                  </button>

                  <button
                    data-tip="Parcel View"
                    className="btn btn-sm btn-square rounded-sm shadow-none bg-accent/10 hover:bg-accent text-base-content border border-accent/30 cursor-pointer transition-all tooltip">
                    <View size={12} />
                  </button>

                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    data-tip="Parcel Delete"
                    className="btn btn-sm btn-square rounded-sm bg-error/10 shadow-none hover:bg-error border border-error/30 text-base-content cursor-pointer transition-all tooltip">
                    <TrashIcon size={12} />
                  </button>
                </div>
              </td>

              <td>{parcel.cost}</td>
            </tr>
          ))}

          {/* If no payment history */}
          {MyParcels.length === 0 && (
            <tr>
              <td
                colSpan="8"
                className="text-center  py-6 text-base-content/60">
                No parcels history found. <br />
                <Link
                  to={"/send-parcel"}
                  className="mt-5 btn shadow-none bg-primary/10 border border-primary/30  ">
                  <CgAdd size={21} /> Add Parcel
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
