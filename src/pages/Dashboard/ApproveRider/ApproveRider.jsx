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
        <div className="modal-box relative rounded-lg shadow-lg border border-base-300">
          {/* Close Button */}
          <form method="dialog">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
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
                <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-3xl">
                  {selectedRider.fastName[0]}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 capitalize">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold">
                    {selectedRider.fastName} {selectedRider.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold lowercase">
                    {selectedRider.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{selectedRider.phoneNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-semibold">
                    {new Date(selectedRider.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="font-semibold">{selectedRider.city}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="font-semibold">{selectedRider.vehicle}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="divider mt-6 mb-4"></div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3">
                <button className="btn btn-sm bg-error/10 border border-error text-error hover:bg-error hover:text-base-content transition shadow-none">
                  Reject
                </button>

                <button className="btn btn-sm bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-base-content transition shadow-none">
                  Approve
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ApproveRider;
