import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { useRef, useState } from "react";
import Container from "../../Responsive/Container";
import { toast } from "react-toastify";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const viewOpenModal = useRef(null);
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch riders
  const {
    isLoading,
    refetch,
    data: riders = [],
  } = useQuery({
    queryKey: ["rider"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider");
      return res.data;
    },
  });

  // Get status safely
  const getStatus = (rider) => {
    if (!rider) return "pending";
    return (rider?.status?.status || rider?.status || "pending")
      .toString()
      .toLowerCase();
  };

  // Update rider status
  const updateRiderStatus = (rider, newStatus) => {
    if (!rider?._id) return;

    const updateInfo = { riderStatus: newStatus, email: rider.email };

    axiosSecure
      .patch(`/rider/${rider._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();

          toast.success(
            `Rider ${newStatus === "approve" ? "Approved" : "Rejected"}!`,
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              style: {
                background: "var(--color-base-200)",
                color: "var(--color-base-content)",
              },
            }
          );

          // Close modal if open
          handleCloseModal();
        }
      })
      .catch(() => {
        toast.error("Failed to update status", {
          style: {
            background: "var(--color-base-200)",
            color: "var(--color-base-content)",
          },
        });
      });
  };

  // Open modal
  const handleOpenModal = (id) => {
    const rider = riders.find((r) => r._id === id);
    setSelectedRider(rider);
    viewOpenModal.current?.showModal();
  };

  // Close modal
  const handleCloseModal = () => {
    viewOpenModal.current?.close();
    setSelectedRider(null);
  };

  if (isLoading)
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <h2 className="text-center text-lg font-medium text-base-content">
            Loading riders...
          </h2>
        </div>
      </Container>
    );

  return (
    <div className="py-6">
      {/* Page Header */}
      <div className="card bg-base-100 shadow-lg ">
        <div className="card-body">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-base-content">
                Rider Approval
              </h2>
              <p className="text-base-content/70 mt-1">
                Review and approve rider applications
              </p>
            </div>
            <div className="text-base-content">Total: {riders.length}</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-base-100 shadow-lg  overflow-hidden">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="bg-base-200">
                <tr>
                  <th className="text-base-content">#</th>
                  <th className="text-base-content">Name</th>
                  <th className="text-base-content">Email</th>
                  <th className="text-base-content">Phone</th>
                  <th className="text-base-content">DOB</th>
                  <th className="text-base-content">City</th>
                  <th className="text-base-content">Vehicle</th>
                  <th className="text-base-content">Status</th>
                  <th className="text-base-content">Actions</th>
                </tr>
              </thead>

              <tbody>
                {riders.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-10">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="text-5xl text-base-content/30">🛵</div>
                        <h3 className="text-xl font-semibold text-base-content/70">
                          No riders found
                        </h3>
                        <p className="text-base-content/50">
                          There are no rider applications to review
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  riders.map((rider, index) => {
                    const status = getStatus(rider);

                    return (
                      <tr
                        key={rider._id}
                        className="hover:bg-base-200/50 transition-colors">
                        <td className="text-base-content">{index + 1}</td>
                        <td className="font-medium text-base-content">
                          {rider.firstName} {rider.lastName}
                        </td>
                        <td className="text-base-content">{rider.email}</td>
                        <td className="text-base-content">
                          {rider.phoneNumber}
                        </td>
                        <td className="text-base-content">
                          {new Date(rider.dateOfBirth).toLocaleDateString()}
                        </td>
                        <td className="text-base-content">{rider.city}</td>
                        <td className="text-base-content">{rider.vehicle}</td>
                        <td>
                          <span
                            className={`badge badge-lg font-bold ${
                              status === "approved"
                                ? "badge-success text-success-content"
                                : status === "reject" || status === "rejected"
                                ? "badge-error text-error-content"
                                : "badge-warning text-warning-content"
                            }`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </td>

                        <td>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                updateRiderStatus(rider, "approve")
                              }
                              disabled={status === "approved"}
                              className={`btn btn-sm btn-circle tooltip ${
                                status === "approved"
                                  ? "btn-success text-success-content"
                                  : "btn-success/10 text-success border-success/30 hover:bg-success/20"
                              }`}
                              data-tip="Approve Rider">
                              <FaUserCheck />
                            </button>

                            <button
                              onClick={() => updateRiderStatus(rider, "reject")}
                              disabled={
                                status === "reject" || status === "rejected"
                              }
                              className={`btn btn-sm btn-circle tooltip ${
                                status === "reject" || status === "rejected"
                                  ? "btn-error text-error-content"
                                  : "btn-error/10 text-error border-error/30 hover:bg-error/20"
                              }`}
                              data-tip="Reject Rider">
                              <FaUserTimes />
                            </button>

                            <button
                              onClick={() => handleOpenModal(rider._id)}
                              className="btn btn-sm btn-circle bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 tooltip"
                              data-tip="View Details">
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
        </div>
      </div>

      {/* Modal */}
      <dialog ref={viewOpenModal} className="modal">
        <div className="modal-box max-w-2xl bg-base-100 border border-base-300 shadow-xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content"
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
                  <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        selectedRider.photoURL ||
                        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      }
                      alt="Rider"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-base-200 p-4 rounded-lg">
                  <p className="text-sm text-base-content/70">Full Name</p>
                  <p className="font-bold text-lg text-base-content">
                    {selectedRider.firstName} {selectedRider.lastName}
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <p className="text-sm text-base-content/70">Email</p>
                  <p className="font-bold text-base-content">
                    {selectedRider.email}
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <p className="text-sm text-base-content/70">Phone</p>
                  <p className="font-bold text-base-content">
                    {selectedRider.phoneNumber}
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <p className="text-sm text-base-content/70">Date of Birth</p>
                  <p className="font-bold text-base-content">
                    {new Date(selectedRider.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <p className="text-sm text-base-content/70">City</p>
                  <p className="font-bold text-base-content">
                    {selectedRider.city}
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <p className="text-sm text-base-content/70">Vehicle</p>
                  <p className="font-bold text-base-content">
                    {selectedRider.vehicle}
                  </p>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-base-content/70">Current Status</p>
                <span
                  className={`text-2xl font-bold ${
                    getStatus(selectedRider) === "approved"
                      ? "text-success"
                      : getStatus(selectedRider) === "reject" ||
                        getStatus(selectedRider) === "rejected"
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

        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCloseModal}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ApproveRider;
