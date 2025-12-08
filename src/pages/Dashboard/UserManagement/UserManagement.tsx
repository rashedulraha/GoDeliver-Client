import React, { useState } from "react";
import Container from "../../Responsive/Container";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserShield, FaUserCheck } from "react-icons/fa";
import { GiShieldDisabled } from "react-icons/gi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

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

  const updateUserRole = useMutation({
    mutationFn: async ({ userId, role }) => {
      const res = await axiosSecure.patch(`/users/${userId}`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User role updated successfully", {
        style: {
          background: "var(--color-base-200)",
          color: "var(--color-base-content)",
        },
      });
    },
    onError: (error) => {
      toast.error(`Failed to update user role: ${error.message}`, {
        style: {
          background: "var(--color-base-200)",
          color: "var(--color-base-content)",
        },
      });
    },
  });

  const handleRoleChange = (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const actionText =
      newRole === "admin" ? "make admin" : "remove admin privileges from";

    Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${actionText} this user`,
      icon: "warning",
      background: "var(--color-base-200)",
      color: "var(--color-base-content)",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "var(--color-error)",
      confirmButtonText: "Yes, do it!",
      customClass: {
        popup: "border border-base-300",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateUserRole.mutate({ userId, role: newRole });
      }
    });
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <h2 className="text-center text-lg font-medium text-base-content">
            Loading users...
          </h2>
        </div>
      </Container>
    );

  if (error)
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-5xl mb-4 text-error">⚠️</div>
          <h2 className="text-center text-xl font-semibold text-error mb-2">
            Failed to load users!
          </h2>
          <p className="text-base-content/70">Please try again later</p>
        </div>
      </Container>
    );

  return (
    <div className="py-6">
      {/* Page Header */}
      <div className="card bg-base-100  mb-6">
        <div className="card-body">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-base-content">
                User Management
              </h2>
              <p className="text-base-content/70 mt-1">
                Manage user roles and permissions
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="input input-bordered input-primary w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="text-base-content">
                Total: {filteredUsers.length}
              </div>
            </div>
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
                  <th className="text-base-content">User</th>
                  <th className="text-base-content">Email</th>
                  <th className="text-base-content">Role</th>
                  <th className="text-base-content">Admin Action</th>
                  <th className="text-base-content">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers?.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-base-200/50 transition-colors">
                    {/* User Info */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                              src={
                                user.imageURL ||
                                "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                              }
                              alt="avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-base-content">
                            {user.name}
                          </p>
                          <p className="text-sm text-base-content/60">
                            {user.location || "Unknown location"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="font-medium text-base-content">
                      {user.email}
                    </td>

                    {/* Role Badge */}
                    <td>
                      <span
                        className={`badge badge-md font-bold ${
                          user.role === "admin"
                            ? "badge-primary text-primary-content"
                            : "badge-accent text-accent-content"
                        }`}>
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* Make Admin / Remove Admin */}
                    <td>
                      {user.role === "user" ? (
                        <button
                          onClick={() => handleRoleChange(user._id, user.role)}
                          className="btn btn-sm bg-error/10 text-error border-error/30 hover:bg-error/20 tooltip"
                          data-tip="Remove Admin"
                          disabled={updateUserRole.isPending}>
                          <GiShieldDisabled size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRoleChange(user._id, user.role)}
                          className="btn btn-sm bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 tooltip"
                          data-tip="Make Admin"
                          disabled={updateUserRole.isPending}>
                          <FaUserShield size={18} />
                        </button>
                      )}
                    </td>

                    {/* Details Button */}
                    <td>
                      <button className="btn btn-sm btn-outline border-base-300 text-base-content hover:bg-base-200">
                        <FaUserCheck size={16} className="mr-1" />
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-10">
              <div className="text-5xl mb-4 text-base-content/30">👥</div>
              <h3 className="text-xl font-semibold text-base-content/70 mb-2">
                No users found
              </h3>
              <p className="text-base-content/50">
                Try adjusting your search term
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
