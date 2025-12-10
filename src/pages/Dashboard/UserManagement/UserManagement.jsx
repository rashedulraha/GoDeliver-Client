import React, { useState } from "react";
import Container from "../../Responsive/Container";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserShield, FaUser, FaSearch } from "react-icons/fa";
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
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchTerm}`);
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
      toast.success("User role updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update role");
    },
  });

  const handleRoleChange = (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const action = newRole === "admin" ? "Make Admin" : "Remove Admin";

    Swal.fire({
      title: "Confirm Action",
      text: `Do you want to ${action.toLowerCase()} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: "Cancel",
      background: "var(--color-base-100)",
      color: "var(--color-base-content)",
      confirmButtonColor:
        newRole === "admin" ? "var(--color-primary)" : "var(--color-error)",
      cancelButtonColor: "var(--color-accent)",
      customClass: { popup: "rounded-md border border-base-300" },
    }).then((result) => {
      if (result.isConfirmed) {
        updateUserRole.mutate({ userId, role: newRole });
      }
    });
  };

  if (isLoading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-32">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading users...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-32">
          <div className="text-6xl mb-4">Warning</div>
          <p className="text-xl font-bold text-error">Failed to load users</p>
          <p className="text-base-content/60 mt-2">Please try again later</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="py-10 lg:py-16">
        <div className="flex  flex-col md:flex-row items-center justify-between">
          {/* Page Header */}
          <div className="mb-5 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-base-content mb-6">
              User <span className="text-primary">Management</span>
            </h1>
            <p className="text-lg text-base-content/70">
              Control user roles and admin privileges
            </p>
          </div>

          {/* Search & Stats */}
          <div className=" mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="input input-bordered input-primary w-full pl-12 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Users Table Card */}
        <div className="bg-base-100 rounded-md border border-base-300 overflow-hidden ">
          <div className="p-6 border-b border-base-300 bg-base-200/50 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-base-content">
              All Registered Users
            </h2>
            <div className="text-center sm:text-right flex items-center gap-3">
              <p className="text-3xl font-bold text-primary">{users.length}</p>
              <p className="text-base-content/70">Total Users</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th>User</th>
                  <th>Email</th>
                  <th>Current Role</th>
                  <th className="text-center">Admin Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-20">
                      <div className="flex flex-col items-center gap-6">
                        <div className="text-6xl">Users</div>
                        <h3 className="text-2xl font-bold text-base-content/60">
                          No users found
                        </h3>
                        <p className="text-base-content/50">
                          {searchTerm
                            ? "Try a different search term"
                            : "No users registered yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover">
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img
                                src={
                                  user.imageURL ||
                                  "https://i.ibb.co.com/0jrg565/avatar.jpg"
                                }
                                alt={user.name}
                              />
                            </div>
                          </div>
                          <div>
                            <p className="font-bold text-base-content">
                              {user.name}
                            </p>
                            <p className="text-sm text-base-content/60">
                              {user.location || "Location not set"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="font-medium text-base-content/80">
                        {user.email}
                      </td>

                      <td>
                        <span
                          className={`badge badge-lg font-bold ${
                            user.role === "admin"
                              ? "bg-primary text-white border-primary"
                              : "bg-accent/20 text-accent border-accent/30"
                          }`}>
                          {user.role || "user"}
                        </span>
                      </td>

                      <td className="text-center">
                        <button
                          onClick={() =>
                            handleRoleChange(user._id, user.role || "user")
                          }
                          disabled={updateUserRole.isPending}
                          className={`btn btn-sm rounded-full ${
                            user.role === "admin"
                              ? "bg-error/10 text-error border-error/30 hover:bg-error/20"
                              : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                          }`}>
                          {user.role === "admin" ? (
                            <>
                              <FaUser className="w-4 h-4" />
                              Remove Admin
                            </>
                          ) : (
                            <>
                              <FaUserShield className="w-4 h-4" />
                              Make Admin
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default UserManagement;
