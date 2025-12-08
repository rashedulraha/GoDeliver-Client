import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import { useRef, useState } from "react";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const viewOpenModal = useRef();
  const [selectedRider, setSelectedRider] = useState(null);

  const { data: riders = [] } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const handleOpenModal = (id) => {
    viewOpenModal.current.showModal();

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

              <td>
                <div className="flex gap-2">
                  <button className="btn btn-sm bg-accent/10 border border-accent">
                    <FaCheckCircle />
                  </button>

                  <button className="btn btn-sm bg-error/10 border border-error">
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

      {/* View Modal */}
      <dialog
        ref={viewOpenModal}
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <h3 className="font-bold text-lg mb-3">Rider Details</h3>

          <form method="dialog">
            <button className="absolute top-5 right-5 p-0.5">
              <IoIosCloseCircleOutline size={24} />
            </button>
          </form>

          {selectedRider && (
            <div className="space-y-2 mt-5 text-base capitalize">
              <p>
                <strong>Name:</strong> {selectedRider.fastName}{" "}
                {selectedRider.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRider.phoneNumber}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {new Date(selectedRider.dateOfBirth).toLocaleDateString()}
              </p>
              <p>
                <strong>City:</strong> {selectedRider.city}
              </p>
              <p>
                <strong>Vehicle:</strong> {selectedRider.vehicle}
              </p>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ApproveRider;
