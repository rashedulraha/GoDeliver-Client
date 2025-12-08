import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Edit, TrashIcon, View } from "lucide-react";
import { CgAdd } from "react-icons/cg";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: riders = [] } = useQuery({
    queryKey: ["rider", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
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
          {riders?.map((parcel, index) => (
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
                  <span className="text-base-content bg-accent/10 border border-accent/30 btn-md btn shadow-none w-full cursor-not-allowed">
                    Paid
                  </span>
                ) : (
                  <Link
                    to={`/dashboard/payment/${parcel._id}`}
                    className="text-base-content bg-accent border border-accent btn-md btn shadow-none w-full">
                    Pay
                  </Link>
                )}
              </td>

              {/* Responsive Action Buttons */}
              <td>
                <div className="flex flex-col lg:flex-row gap-2">
                  <button
                    data-tip="Parcel Edit"
                    className="btn btn-md btn-square shadow-none rounded-sm bg-primary/10 text-base-content border-primary/30 border cursor-pointer hover:bg-primary transition-all tooltip">
                    <Edit size={12} />
                  </button>

                  <button
                    data-tip="Parcel View"
                    className="btn btn-md btn-square rounded-sm shadow-none bg-accent/10 hover:bg-accent text-base-content border border-accent/30 cursor-pointer transition-all tooltip">
                    <View size={12} />
                  </button>

                  <button
                    data-tip="Parcel Delete"
                    className="btn btn-md btn-square rounded-sm bg-error/10 shadow-none hover:bg-error border border-error/30 text-base-content cursor-pointer transition-all tooltip">
                    <TrashIcon size={12} />
                  </button>
                </div>
              </td>

              <td>{parcel.cost}</td>
            </tr>
          ))}

          {/* If no payment history */}
          {riders.length === 0 && (
            <tr>
              <td
                colSpan="8"
                className="text-center  py-6 text-base-content/60">
                No parcels history found. <br />
                <Link
                  to={"/send-parcel"}
                  className="mt-5 btn shadow-none bg-base-200/10 border border-base-200/30  ">
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

export default ApproveRider;
