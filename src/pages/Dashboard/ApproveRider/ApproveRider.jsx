import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const viewOpenModal = useRef(null);
  const [selectedRider, setSelectedRider] = useState(null);

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["rider"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider");
      return res.data;
    },
  });

  // Helper function to get correct status string
  const getStatus = (rider) => {
    if (!rider) return "pending";
    if (typeof rider.status === "string") return rider.status.toLowerCase();
    if (rider.status && typeof rider.status === "object" && rider.status.status)
      return rider.status.status.toLowerCase();
    return "pending";
  };

  const updateRiderStatus = (rider, newStatus) => {
    const updateInfo = { riderStatus: newStatus, email: rider.email };

    axiosSecure
      .patch(`/rider/${rider._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `Rider ${
              newStatus === "approve" ? "Approved" : "Rejected"
            }!`,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update status", "error");
      });
  };

  const handleOpenModal = (id) => {
    const rider = riders.find((r) => r._id === id);
    setSelectedRider(rider);
    viewOpenModal.current?.showModal();
  };

  const handleCloseModal = () => {
    viewOpenModal.current?.close();
    setSelectedRider(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Approve Riders</h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>City</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-10 text-gray-500">
                  No riders found
                </td>
              </tr>
            ) : (
              riders.map((rider, index) => {
                const status = getStatus(rider);

                return (
                  <tr key={rider._id} className="hover">
                    <td>{index + 1}</td>
                    <td className="font-medium">
                      {rider.fastName} {rider.lastName}
                    </td>
                    <td>{rider.email}</td>
                    <td>{rider.phoneNumber}</td>
                    <td>{new Date(rider.dateOfBirth).toLocaleDateString()}</td>
                    <td>{rider.city}</td>
                    <td>{rider.vehicle}</td>

                    <td>
                      <span
                        className={`badge badge-lg font-bold ${
                          status === "approved"
                            ? "badge-success"
                            : status === "reject"
                            ? "badge-error"
                            : "badge-warning"
                        }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>

                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateRiderStatus(rider, "approve")}
                          disabled={status === "approved"}
                          className="btn btn-sm btn-success btn-outline"
                          title="Approve">
                          <FaCheckCircle />
                        </button>

                        <button
                          onClick={() => updateRiderStatus(rider, "reject")}
                          disabled={status === "reject"}
                          className="btn btn-sm btn-error btn-outline"
                          title="Reject">
                          <FaTimesCircle />
                        </button>

                        <button
                          onClick={() => handleOpenModal(rider._id)}
                          className="btn btn-sm btn-primary btn-outline"
                          title="View Details">
                          <FaEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={viewOpenModal} className="modal">
        <div className="modal-box max-w-2xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}>
            ✕
          </button>

          <h3 className="font-bold text-2xl text-center mb-6 text-primary">
            Rider Details
          </h3>

          {selectedRider && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="avatar">
                  <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={selectedRider.photoURL || "/default-avatar.png"}
                      alt="Rider"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm opacity-70">Full Name</p>
                  <p className="font-bold text-lg">
                    {selectedRider.fastName} {selectedRider.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Email</p>
                  <p className="font-bold">{selectedRider.email}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Phone</p>
                  <p className="font-bold">{selectedRider.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Date of Birth</p>
                  <p className="font-bold">
                    {new Date(selectedRider.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70">City</p>
                  <p className="font-bold">{selectedRider.city}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Vehicle</p>
                  <p className="font-bold">{selectedRider.vehicle}</p>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm opacity-70">Current Status</p>
                <span
                  className={`text-2xl font-bold ${
                    getStatus(selectedRider) === "approved"
                      ? "text-success"
                      : getStatus(selectedRider) === "reject"
                      ? "text-error"
                      : "text-warning"
                  }`}>
                  {getStatus(selectedRider).charAt(0).toUpperCase() +
                    getStatus(selectedRider).slice(1)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCloseModal}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ApproveRider;
