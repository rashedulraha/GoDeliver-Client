import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

// Icons
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: riders = [] } = useQuery({
    queryKey: ["riders"],
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
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>Vehicle</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider._id} className="capitalize">
              <td>{index + 1}</td>

              {/* Full Name */}
              <td>
                {rider.fastName} {rider.lastName}
              </td>

              <td>{rider.email}</td>

              <td>{rider.phoneNumber}</td>

              {/* DOB Formatting */}
              <td>
                {rider.dateOfBirth
                  ? new Date(rider.dateOfBirth).toLocaleDateString()
                  : "N/A"}
              </td>

              <td>{rider.city}</td>

              <td>{rider.vehicle}</td>

              {/* Action Buttons */}
              <td>
                <div className="flex gap-2">
                  {/* Approve */}
                  <button
                    className="btn btn-sm shadow-none bg-accent/10 border border-accent"
                    data-tip="Approve">
                    <FaCheckCircle />
                  </button>

                  {/* Reject */}
                  <button
                    className="btn btn-sm shadow-none bg-error/10 border border-error"
                    data-tip="Reject">
                    <FaTimesCircle />
                  </button>

                  {/* View */}
                  <Link
                    to={`/dashboard/rider/${rider._id}`}
                    className="btn btn-sm shadow-none bg-primary/10  border border-primary"
                    data-tip="View Details">
                    <FaEye />
                  </Link>
                </div>
              </td>
            </tr>
          ))}

          {/* If no riders */}
          {riders.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center py-6 text-base-content/60">
                No Riders Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveRider;
