"use client";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { CiCircleRemove } from "react-icons/ci";
import Swal from "sweetalert2";
import {
  FaUser,
  FaMotorcycle,
  FaUserShield,
  FaCog,
  FaChartLine,
  FaHistory,
  FaWallet,
  FaStar,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaBell,
  FaLock,
  FaGlobe,
  FaCreditCard,
  FaHeadset,
  FaSignOutAlt,
} from "react-icons/fa";

const Profile = () => {
  const { user, loading, updateUserProfile, deleteAccount, userRole, logout } =
    useAuth();
  const [updating, setUpdating] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const modalRef = useRef();
  const { register, handleSubmit } = useForm();

  // Fetch user-specific stats based on role
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        // This would be replaced with your actual API endpoint
        const response = await axios.get(`/api/user-stats/${user.uid}`);
        setUserStats(response.data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    if (user) {
      fetchUserStats();
    }
  }, [user]);

  if (loading) return <LoadingSpinner />;

  const openModal = () => modalRef.current.showModal();
  const closeModal = () => modalRef.current.close();

  // update profile modal submit
  const handleUpdateProfile = async (data) => {
    setUpdating(true);

    try {
      let photoURL = user.photoURL;

      // Only upload new image if one was selected
      if (data.image && data.image[0]) {
        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;

        const uploadRes = await axios.post(uploadURL, formData);
        photoURL = uploadRes.data.data.url;
      }

      const updatedInfo = {
        displayName: data.name,
        photoURL: photoURL,
      };

      await updateUserProfile(updatedInfo);
      toast.success("Profile updated successfully!");
      closeModal();
    } catch (err) {
      toast.error("Profile update failed");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  // delete account
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action is permanent and cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete my account",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteAccount()
          .then(() => {
            toast.success("Account deleted successfully!");
          })
          .catch((err) => {
            toast.error("Failed to delete account");
            console.error(err);
          });
      }
    });
  };

  // Role-specific dashboard links
  const getDashboardLinks = () => {
    const baseLinks = [
      {
        to: "/dashboard",
        label: "Dashboard",
        icon: <FaChartLine className="mr-2" />,
      },
      {
        to: "/account-settings",
        label: "Account Settings",
        icon: <FaCog className="mr-2" />,
      },
    ];

    if (userRole === "rider") {
      return [
        ...baseLinks,
        {
          to: "/ride-history",
          label: "Ride History",
          icon: <FaHistory className="mr-2" />,
        },
        {
          to: "/earnings",
          label: "My Earnings",
          icon: <FaWallet className="mr-2" />,
        },
        {
          to: "/ratings",
          label: "My Ratings",
          icon: <FaStar className="mr-2" />,
        },
        {
          to: "/vehicle-info",
          label: "Vehicle Info",
          icon: <FaMotorcycle className="mr-2" />,
        },
      ];
    } else if (userRole === "admin") {
      return [
        ...baseLinks,
        {
          to: "/manage-users",
          label: "Manage Users",
          icon: <FaUser className="mr-2" />,
        },
        {
          to: "/system-analytics",
          label: "System Analytics",
          icon: <FaChartLine className="mr-2" />,
        },
        {
          to: "/reports",
          label: "Reports",
          icon: <FaChartLine className="mr-2" />,
        },
        {
          to: "/support-tickets",
          label: "Support Tickets",
          icon: <FaHeadset className="mr-2" />,
        },
      ];
    } else {
      return [
        ...baseLinks,
        {
          to: "/ride-history",
          label: "My Rides",
          icon: <FaHistory className="mr-2" />,
        },
        {
          to: "/payment-methods",
          label: "Payment Methods",
          icon: <FaCreditCard className="mr-2" />,
        },
        {
          to: "/saved-locations",
          label: "Saved Locations",
          icon: <FaMapMarkerAlt className="mr-2" />,
        },
        {
          to: "/ride-preferences",
          label: "Ride Preferences",
          icon: <FaCog className="mr-2" />,
        },
      ];
    }
  };

  // Role-specific stats display
  const renderRoleSpecificStats = () => {
    if (!userStats) return null;

    if (userRole === "rider") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-6">
          <div className="stat bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <div className="stat-title text-blue-800 dark:text-blue-300">
              Total Rides
            </div>
            <div className="stat-value text-2xl text-blue-600 dark:text-blue-400">
              {userStats.totalRides || 0}
            </div>
            <div className="stat-desc text-blue-500 dark:text-blue-400">
              Completed trips
            </div>
          </div>
          <div className="stat bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <div className="stat-title text-green-800 dark:text-green-300">
              Rating
            </div>
            <div className="stat-value text-2xl text-green-600 dark:text-green-400">
              {userStats.rating || "0.0"}
            </div>
            <div className="stat-desc text-green-500 dark:text-green-400">
              Average score
            </div>
          </div>
          <div className="stat bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
            <div className="stat-title text-yellow-800 dark:text-yellow-300">
              Earnings
            </div>
            <div className="stat-value text-2xl text-yellow-600 dark:text-yellow-400">
              ${userStats.earnings || "0.00"}
            </div>
            <div className="stat-desc text-yellow-500 dark:text-yellow-400">
              This month
            </div>
          </div>
          <div className="stat bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
            <div className="stat-title text-purple-800 dark:text-purple-300">
              Online Hours
            </div>
            <div className="stat-value text-2xl text-purple-600 dark:text-purple-400">
              {userStats.onlineHours || 0}h
            </div>
            <div className="stat-desc text-purple-500 dark:text-purple-400">
              This week
            </div>
          </div>
        </div>
      );
    } else if (userRole === "admin") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-6">
          <div className="stat bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
            <div className="stat-title text-indigo-800 dark:text-indigo-300">
              Total Users
            </div>
            <div className="stat-value text-2xl text-indigo-600 dark:text-indigo-400">
              {userStats.totalUsers || 0}
            </div>
            <div className="stat-desc text-indigo-500 dark:text-indigo-400">
              Registered
            </div>
          </div>
          <div className="stat bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 rounded-xl p-4 border border-teal-200 dark:border-teal-800">
            <div className="stat-title text-teal-800 dark:text-teal-300">
              Active Riders
            </div>
            <div className="stat-value text-2xl text-teal-600 dark:text-teal-400">
              {userStats.activeRiders || 0}
            </div>
            <div className="stat-desc text-teal-500 dark:text-teal-400">
              Online now
            </div>
          </div>
          <div className="stat bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/30 rounded-xl p-4 border border-rose-200 dark:border-rose-800">
            <div className="stat-title text-rose-800 dark:text-rose-300">
              Total Rides
            </div>
            <div className="stat-value text-2xl text-rose-600 dark:text-rose-400">
              {userStats.totalRides || 0}
            </div>
            <div className="stat-desc text-rose-500 dark:text-rose-400">
              All time
            </div>
          </div>
          <div className="stat bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
            <div className="stat-title text-amber-800 dark:text-amber-300">
              Revenue
            </div>
            <div className="stat-value text-2xl text-amber-600 dark:text-amber-400">
              ${userStats.revenue || "0.00"}
            </div>
            <div className="stat-desc text-amber-500 dark:text-amber-400">
              This month
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-6">
          <div className="stat bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 rounded-xl p-4 border border-cyan-200 dark:border-cyan-800">
            <div className="stat-title text-cyan-800 dark:text-cyan-300">
              Total Rides
            </div>
            <div className="stat-value text-2xl text-cyan-600 dark:text-cyan-400">
              {userStats.totalRides || 0}
            </div>
            <div className="stat-desc text-cyan-500 dark:text-cyan-400">
              Completed
            </div>
          </div>
          <div className="stat bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
            <div className="stat-title text-emerald-800 dark:text-emerald-300">
              Amount Spent
            </div>
            <div className="stat-value text-2xl text-emerald-600 dark:text-emerald-400">
              ${userStats.amountSpent || "0.00"}
            </div>
            <div className="stat-desc text-emerald-500 dark:text-emerald-400">
              This month
            </div>
          </div>
          <div className="stat bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/30 dark:to-violet-800/30 rounded-xl p-4 border border-violet-200 dark:border-violet-800">
            <div className="stat-title text-violet-800 dark:text-violet-300">
              Saved Locations
            </div>
            <div className="stat-value text-2xl text-violet-600 dark:text-violet-400">
              {userStats.savedLocations || 0}
            </div>
            <div className="stat-desc text-violet-500 dark:text-violet-400">
              Favorites
            </div>
          </div>
          <div className="stat bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-900/30 dark:to-fuchsia-800/30 rounded-xl p-4 border border-fuchsia-200 dark:border-fuchsia-800">
            <div className="stat-title text-fuchsia-800 dark:text-fuchsia-300">
              Member Since
            </div>
            <div className="stat-value text-lg text-fuchsia-600 dark:text-fuchsia-400">
              {userStats.memberSince || "N/A"}
            </div>
            <div className="stat-desc text-fuchsia-500 dark:text-fuchsia-400">
              Join date
            </div>
          </div>
        </div>
      );
    }
  };

  // Get role icon
  const getRoleIcon = () => {
    switch (userRole) {
      case "rider":
        return <FaMotorcycle className="text-xl" />;
      case "admin":
        return <FaUserShield className="text-xl" />;
      default:
        return <FaUser className="text-xl" />;
    }
  };

  // Get role color
  const getRoleColor = () => {
    switch (userRole) {
      case "rider":
        return "bg-blue-500";
      case "admin":
        return "bg-purple-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 dark:from-base-900 dark:to-base-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-base-content">My Profile</h1>
            <p className="text-base-content/70">
              Manage your account and preferences
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="btn btn-ghost btn-circle relative">
              <FaBell className="text-xl" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 badge badge-error badge-xs">
                  {notifications}
                </span>
              )}
            </button>
            <button
              onClick={logout}
              className="btn btn-ghost flex items-center text-base-content hover:text-primary">
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 dark:bg-base-900 shadow-xl rounded-2xl overflow-hidden border border-base-300 dark:border-base-700">
              {/* Profile Header */}
              <div className={`h-24 ${getRoleColor()}`}></div>

              {/* Profile Content */}
              <div className="px-6 pb-6 relative">
                <div className="avatar -mt-12 mb-4">
                  <div className="w-24 rounded-full ring-4 ring-base-100 dark:ring-base-900 ring-offset-base-100 dark:ring-offset-base-900 ring-offset-2">
                    <img
                      src={
                        user?.photoURL ||
                        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      }
                      alt="Profile"
                    />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-base-content">
                    {user?.displayName || "User"}
                  </h2>
                  <p className="text-base-content/70">{user?.email}</p>
                  <div className="mt-2 flex justify-center">
                    <div className={`badge ${getRoleColor()} text-white gap-2`}>
                      {getRoleIcon()}
                      <span className="capitalize">{userRole}</span>
                    </div>
                  </div>
                  <p className="text-sm text-base-content/50 mt-2">
                    Member since:{" "}
                    {user?.metadata?.creationTime
                      ? new Date(
                          user.metadata.creationTime
                        ).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>

                <div className="divider my-4"></div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <button
                    onClick={openModal}
                    className="btn btn-info w-full flex items-center justify-center">
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </button>

                  <Link
                    to="/security-settings"
                    className="btn btn-outline w-full flex items-center justify-center">
                    <FaLock className="mr-2" />
                    Security Settings
                  </Link>

                  <Link
                    to="/notification-settings"
                    className="btn btn-outline w-full flex items-center justify-center">
                    <FaBell className="mr-2" />
                    Notifications
                  </Link>

                  <Link
                    to="/language-settings"
                    className="btn btn-outline w-full flex items-center justify-center">
                    <FaGlobe className="mr-2" />
                    Language & Region
                  </Link>

                  <button
                    onClick={handleDelete}
                    className="btn btn-error btn-outline w-full flex items-center justify-center">
                    <FaTrash className="mr-2" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats and Actions */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 dark:bg-base-900 shadow-xl rounded-2xl p-6 border border-base-300 dark:border-base-700">
              <h3 className="text-xl font-bold mb-6 text-base-content">
                Account Overview
              </h3>

              {/* Role-specific stats */}
              {renderRoleSpecificStats()}

              <div className="divider my-8"></div>

              {/* Role-specific navigation */}
              <h3 className="text-xl font-bold mb-4 text-base-content">
                Quick Access
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getDashboardLinks().map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="btn btn-primary bg-gradient-to-r from-blue-500 to-indigo-600 border-none hover:from-blue-600 hover:to-indigo-700 flex items-center justify-center">
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-base-content">
                  Recent Activity
                </h3>
                <div className="bg-base-200 dark:bg-base-800 rounded-xl p-4">
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-base-100 dark:bg-base-900 rounded-lg shadow-sm">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                        <FaHistory className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-base-content">
                          Completed ride to Downtown
                        </p>
                        <p className="text-sm text-base-content/50">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-base-100 dark:bg-base-900 rounded-lg shadow-sm">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                        <FaWallet className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-base-content">
                          Payment received
                        </p>
                        <p className="text-sm text-base-content/50">
                          Yesterday
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-base-100 dark:bg-base-900 rounded-lg shadow-sm">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                        <FaStar className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-base-content">
                          Received 5-star rating
                        </p>
                        <p className="text-sm text-base-content/50">
                          2 days ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative max-w-md bg-base-100 dark:bg-base-900">
          <button
            onClick={closeModal}
            className="absolute right-3 top-3 btn btn-ghost btn-sm btn-circle">
            <CiCircleRemove size={24} />
          </button>

          <h3 className="font-bold text-lg mb-4 text-base-content">
            Update Profile
          </h3>

          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Name</span>
              </label>
              <input
                type="text"
                defaultValue={user?.displayName || ""}
                {...register("name", { required: true })}
                className="input input-bordered w-full bg-base-200 dark:bg-base-800 text-base-content"
                placeholder="Your name"
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-base-content">
                  Profile Photo
                </span>
              </label>
              <input
                type="file"
                {...register("image")}
                className="file-input w-full bg-base-200 dark:bg-base-800 text-base-content"
                accept="image/*"
              />
              <label className="label">
                <span className="label-text-alt text-base-content/70">
                  Leave empty to keep current photo
                </span>
              </label>
            </div>

            <div className="modal-action mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-ghost">
                Cancel
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={updating}>
                {updating ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Profile;
