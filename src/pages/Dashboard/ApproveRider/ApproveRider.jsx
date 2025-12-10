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

  const getStatus = (rider) => {
    if (!rider) return "pending";
    const status =
      rider?.status?.status || rider?.status || rider?.riderStatus || "pending";
    return status.toString().toLowerCase();
  };

  const updateRiderStatus = (rider, newStatus) => {
    if (!rider?._id) return;

    const updateInfo = { riderStatus: newStatus, email: rider.email };

    axiosSecure
      .patch(`/rider/${rider._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(
            `Rider ${
              newStatus === "approve" ? "approved" : "rejected"
            } successfully!`
          );
          handleCloseModal();
        }
      })
      .catch(() => {
        toast.error("Failed to update status");
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

  if (isLoading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-32">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading riders...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="py-10 lg:py-16">
        {/* Header */}
        <div className=" mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-base-content mb-6">
            Rider <span className="text-primary">Approval</span>
          </h1>
          <p className="text-lg text-base-content/70 mt-4">
            Review and approve/reject rider registration requests
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-base-100 rounded-md border border-base-300 overflow-hidden">
          <div className="p-6 border-b border-base-300">
            <h2 className="text-2xl font-bold text-base-content">
              All Rider Applications ({riders.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>District</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {riders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-16">
                      <div className="text-base-content/40">
                        <div className="text-6xl mb-4">Motorcycle</div>
                        <p className="text-xl font-medium">
                          No rider applications yet
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  riders.map((rider, index) => {
                    const status = getStatus(rider);

                    return (
                      <tr key={rider._id} className="hover">
                        <td>{index + 1}</td>
                        <td className="font-medium">{rider.fullName}</td>
                        <td>{rider.email}</td>
                        <td>{rider.phoneNumber}</td>
                        <td>{rider.district}</td>
                        <td>{rider.vehicle || "-"}</td>
                        <td>
                          <span
                            className={`badge ${
                              status === "approved"
                                ? "badge-success"
                                : status === "reject" || status === "rejected"
                                ? "badge-error"
                                : "badge-warning"
                            }`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() =>
                                updateRiderStatus(rider, "approve")
                              }
                              disabled={status === "approved"}
                              className="btn btn-sm btn-success shadow-none"
                              title="Approve">
                              <FaUserCheck />
                            </button>

                            <button
                              onClick={() => updateRiderStatus(rider, "reject")}
                              disabled={
                                status === "reject" || status === "rejected"
                              }
                              className="btn btn-sm btn-error shadow-none "
                              title="Reject">
                              <FaUserTimes />
                            </button>

                            <button
                              onClick={() => handleOpenModal(rider._id)}
                              className="btn btn-sm bg-primary/10 text-primary border border-primary/30 shadow-none  hover:bg-primary/20"
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
        </div>

        {/* Modal - Exact same style as your Contact page */}
        <dialog ref={viewOpenModal} className="modal">
          <div className="modal-box bg-base-100 rounded-md border border-base-300">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                Close
              </button>
            </form>

            {selectedRider && (
              <>
                <h3 className="text-2xl font-bold text-base-content mb-8 text-center">
                  Rider Details
                </h3>

                <div className="space-y-6">
                  <div className="text-center">
                    <div className="avatar">
                      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={
                            selectedRider.photoURL ||
                            "https://i.ibb.co.com/0jrg565/avatar.jpg"
                          }
                          alt="Rider"
                        />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold mt-4 text-base-content">
                      {selectedRider.fullName}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-base-content/70">Email</p>
                      <p className="font-medium text-base-content">
                        {selectedRider.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-base-content/70">Phone</p>
                      <p className="font-medium text-base-content">
                        {selectedRider.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-base-content/70">
                        Date of Birth
                      </p>
                      <p className="font-medium text-base-content">
                        {new Date(
                          selectedRider.dateOfBirth
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-base-content/70">District</p>
                      <p className="font-medium text-base-content">
                        {selectedRider.district}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-base-content/70">Vehicle</p>
                      <p className="font-medium text-base-content">
                        {selectedRider.vehicle || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-base-content/70">
                        Current Status
                      </p>
                      <span
                        className={`badge ${
                          getStatus(selectedRider) === "approved"
                            ? "badge-success"
                            : getStatus(selectedRider) === "reject"
                            ? "badge-error"
                            : "badge-warning"
                        }`}>
                        {getStatus(selectedRider).charAt(0).toUpperCase() +
                          getStatus(selectedRider).slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </dialog>
      </section>
    </Container>
  );
};

export default ApproveRider;
