import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();

  const viewOpenModal = useRef();
  const [selectedRider, setSelectedRider] = useState(null);

  const { data: riders = [] } = useQuery({
    queryKey: ["rider"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider");
      return res.data;
    },
  });

  const updateRiderStatus = (id, status) => {
    const updateInfo = { status: status };
    axiosSecure
      .patch(`/rider/${id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            background: "switchColor",
            title: "Rider approved successfully complete",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleApproval = (id) => {
    const updateInfo = { status: "approve" };
    updateRiderStatus(id, updateInfo);
  };
  const handleReject = (id) => {
    const updateInfo = { status: "reject" };
    updateRiderStatus(id, updateInfo);
  };

  const handleOpenModal = (id) => {
    viewOpenModal.current.showModal();
    console.log(id);

    const findCurrentRider = riders.find((rider) => rider._id === id);
    setSelectedRider(findCurrentRider);
  };

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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider._id} className="capitalize">
              <td>{index + 1}</td>

              <td>
                {rider.fastName} {rider.lastName}
              </td>
              <td>{rider.email}</td>
              <td>{rider.phoneNumber}</td>
              <td>{new Date(rider.dateOfBirth).toLocaleDateString()}</td>
              <td>{rider.city}</td>
              <td>{rider.vehicle}</td>
              <td
                className={
                  rider.status === "approved"
                    ? "text-accent font-semibold"
                    : rider.status === "reject"
                    ? "text-error font-semibold"
                    : rider.status === "pending"
                    ? "text-primary font-semibold"
                    : "text-base-content"
                }>
                {rider.status}
              </td>

              <td>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApproval(rider._id)}
                    className="btn btn-sm bg-accent/10 border border-accent">
                    <FaCheckCircle />
                  </button>

                  <button
                    onClick={() => handleReject(rider._id)}
                    className="btn btn-sm bg-error/10 border border-error">
                    <FaTimesCircle />
                  </button>

                  <button
                    onClick={() => handleOpenModal(rider._id)}
                    className="btn btn-sm bg-primary/10 border border-primary">
                    <FaEye />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {riders.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center py-6">
                No Riders Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <dialog
        ref={viewOpenModal}
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative rounded-lg shadow-lg border border-base-300">
          {/* Close Button */}
          <form method="dialog">
            <button className="absolute top-4 right-4 text-base-content/30 hover:text-error transition">
              <IoIosCloseCircleOutline size={28} />
            </button>
          </form>

          {/* Header */}
          <h3 className="font-bold text-2xl mb-6 text-center text-primary">
            Rider Details
          </h3>

          {/* Rider Info */}
          {selectedRider && (
            <div className="space-y-4 text-base">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full  border-primary/30 flex items-center justify-center overflow-hidden">
                  <img src={selectedRider.photoURL} alt="rider photo" />
                </div>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 capitalize">
                <div>
                  <p className="text-sm text-base-content/40">Full Name</p>
                  <p className="font-semibold">
                    {selectedRider.fastName} {selectedRider.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-base-content/40">Email</p>
                  <p className="font-semibold lowercase">
                    {selectedRider.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-base-content/40">Phone</p>
                  <p className="font-semibold">{selectedRider.phoneNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-base-content/40">Date of Birth</p>
                  <p className="font-semibold">
                    {new Date(selectedRider.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-base-content/40">City</p>
                  <p className="font-semibold">{selectedRider.city}</p>
                </div>

                <div>
                  <p className="text-sm text-base-content/40">Vehicle</p>
                  <p className="font-semibold">{selectedRider.vehicle}</p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-sm text-base-content/40 ">Status</p>
                  <p
                    className={
                      selectedRider.status === "approved"
                        ? "text-accent font-semibold"
                        : selectedRider.status === "reject"
                        ? "text-error font-semibold "
                        : selectedRider.status === "pending"
                        ? "text-primary font-semibold "
                        : selectedRider.status === "onHold"
                        ? "text-warning font-semibold "
                        : "text-base-content font-semibold"
                    }>
                    {selectedRider.status
                      ? selectedRider.status.charAt(0).toUpperCase() +
                        selectedRider.status.slice(1)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ApproveRider;
