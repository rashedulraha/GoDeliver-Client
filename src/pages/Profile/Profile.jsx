import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

import {
  FaBell,
  FaCreditCard,
  FaSignOutAlt,
  FaStar,
  FaMapMarkedAlt,
  FaCar,
  FaClock,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // User-specific stats display
  const renderUserStats = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-6">
        <div className="stat bg-base-200 rounded-md p-4 border border-base-300">
          <div className="stat-title text-base-content">Total Rides</div>
          <div className="stat-value text-2md text-primary"></div>
          <div className="stat-desc text-base-content/70">Completed</div>
        </div>
        <div className="stat bg-base-200 rounded-md p-4 border border-base-300">
          <div className="stat-title text-base-content">Amount Spent</div>
          <div className="stat-value text-2md text-accent"></div>
          <div className="stat-desc text-base-content/70">This month</div>
        </div>
        <div className="stat bg-base-200 rounded-md p-4 border border-base-300">
          <div className="stat-title text-base-content">Saved Locations</div>
          <div className="stat-value text-2md text-primary"></div>
          <div className="stat-desc text-base-content/70">Favorites</div>
        </div>
        <div className="stat bg-base-200 rounded-md p-4 border border-base-300">
          <div className="stat-title text-base-content">Member Since</div>
          <div className="stat-value text-lg text-accent"></div>
          <div className="stat-desc text-base-content/70">Join date</div>
        </div>
      </div>
    );
  };

  // User-specific additional info
  const renderUserInfo = () => {
    return (
      <div className="mt-6 bg-base-200 rounded-md p-4">
        <h4 className="font-bold text-lg mb-3 text-base-content">
          User Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <FaCreditCard className="text-accent mr-2" />
            <div>
              <p className="text-sm text-base-content/70">Payment Methods</p>
              <p className="font-medium text-base-content">saved</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaStar className="text-accent mr-2" />
            <div>
              <p className="text-sm text-base-content/70">Favorite Drivers</p>
              <p className="font-medium text-base-content">drivers</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaCar className="text-primary mr-2" />
            <div>
              <p className="text-sm text-base-content/70">Upcoming Rides</p>
              <p className="font-medium text-base-content"></p>
            </div>
          </div>
          <div className="flex items-center">
            <FaClock className="text-primary mr-2" />
            <div>
              <p className="text-sm text-base-content/70">Last Ride</p>
              <p className="font-medium text-base-content"></p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      background: "#1e293b",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#f87171",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            navigate("/login");
            toast.success("Successfully Logged out");
          })
          .catch(() => toast.error("Network error! Try again"));
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-8">
      <div className="max-w-6md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3md font-bold text-base-content">My Profile</h1>
            <p className="text-base-content/70">
              Manage your account and preferences
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="btn bg-primary/10 border border-primary/30 hover:bg-primary btn-circle relative transition-all ">
              <FaBell className="text-md text-base-content" />
            </button>
            <button
              className="btn bg-error/10 border border-error/30 hover:bg-error shadow-none text-base-content transition-all"
              onClick={handleLogout}>
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-200 shadow-md rounded-md overflow-hidden border border-base-300">
              {/* Profile Header */}
              <div className="h-24 bg-primary"></div>

              {/* Profile Content */}
              <div className="px-6 pb-6 relative">
                <div className="avatar -mt-12 mb-4">
                  <div className="w-24 rounded-full ring-4 ring-base-200 ring-offset-base-200 ring-offset-2">
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
                  <h2 className="text-2md font-bold  text-base-content">
                    {user?.displayName || "User"}
                  </h2>
                  <p className="text-base-content/70">{user?.email}</p>
                  <div className="mt-2 flex justify-center"></div>
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
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card bg-base-200 shadow-md rounded-md p-6 border border-base-300">
              <h3 className="text-md font-bold mb-6 text-base-content">
                Account Overview
              </h3>

              {/* User-specific stats */}
              {renderUserStats()}

              {/* User-specific additional info */}
              {renderUserInfo()}

              <div className="divider my-8"></div>

              {/* User-specific navigation */}
              <h3 className="text-md font-bold mb-4 text-base-content">
                Quick Access
              </h3>

              {/* Recent Activity */}
              <div className="mt-8">
                <h3 className="text-md font-bold mb-4 text-base-content">
                  Recent Activity
                </h3>
                <div className="bg-base-300 rounded-md p-4">
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-base-200 rounded-lg shadow-sm">
                      <div className="bg-base-300 p-2 rounded-full mr-3">
                        <FaCar className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-base-content">
                          Ride booked to Airport
                        </p>
                        <p className="text-sm text-base-content/50">
                          1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-base-200 rounded-lg shadow-sm">
                      <div className="bg-base-300 p-2 rounded-full mr-3">
                        <FaCreditCard className="text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-base-content">
                          Payment method added
                        </p>
                        <p className="text-sm text-base-content/50">
                          Yesterday
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-base-200 rounded-lg shadow-sm">
                      <div className="bg-base-300 p-2 rounded-full mr-3">
                        <FaMapMarkedAlt className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-base-content">
                          New location saved: Home
                        </p>
                        <p className="text-sm text-base-content/50">
                          3 days ago
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
    </div>
  );
};

export default Profile;
