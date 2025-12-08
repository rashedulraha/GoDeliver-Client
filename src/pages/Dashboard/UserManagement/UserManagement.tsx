import React from "react";
import Container from "../../Responsive/Container";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import { GiShieldDisabled } from "react-icons/gi";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <Container>
        <h2 className="text-center py-10 animate-pulse text-lg">
          Loading users...
        </h2>
      </Container>
    );

  if (error)
    return (
      <Container>
        <h2 className="text-center py-10 text-red-500 font-semibold">
          Failed to load users!
        </h2>
      </Container>
    );

  return (
    <div className="py-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold ">User Management</h2>
        <span className="font-semibold">Total: {users.length}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 border-base-300">
        <table className="table table-zebra">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user, index) => (
              <tr key={index} className="hover">
                {/* User Info */}
                <td>
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.imageURL} alt="avatar" />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-lg">{user.name}</p>
                      <p className="text-sm opacity-60">
                        {user.location || "Unknown"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="font-medium">{user.email}</td>

                {/* Role Badge */}
                <td>
                  <span
                    className={`badge badge-md font-bold ${
                      user.role === "admin" ? "badge-primary" : "badge-accent"
                    }`}>
                    {user.role || "user"}
                  </span>
                </td>

                {/* Make Admin / Remove Admin */}
                <td>
                  {user.role === "admin" ? (
                    <button
                      className="btn btn-sm btn-error text-white"
                      title="Remove Admin">
                      <GiShieldDisabled size={18} />
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-success text-white"
                      title="Make Admin">
                      <FaUserShield size={18} />
                    </button>
                  )}
                </td>

                {/* Details Button */}
                <td>
                  <button className="btn btn-outline btn-sm rounded-lg">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
