import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, loading, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;
  const email = user?.email;

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#1e293b",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: " #f87171",
      cancelButtonColor: "#14b8a6",
      confirmButtonText: "Yes, delete account!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAccount()
          .then(() => {
            navigate("/register");
            toast.success("Successfully delete your account");
          })
          .catch(() => {
            toast.error("Network error please try again");
          });
      }
    });
  };

  return (
    <div className="card bg-base-200 text-base-content w-full max-w-md mx-auto my-5">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl font-bold mb-4">My Profile</h2>

        {/* Profile Image */}
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2 ">
            <img
              src={photoURL}
              alt="User Profile"
              className=" w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h3 className="text-xl font-semibold mt-4">{displayName}</h3>

        {/* Email */}
        <p className="text-base-200 text-sm">{email}</p>

        <div className="divider"></div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3 w-full items-center justify-center">
          <Link
            to="/edit-profile"
            className="btn btn-accent shadow-none  btn-sm text-base-content">
            Edit Profile
          </Link>
          <Link
            to="/edit-profile"
            className="btn btn-accent shadow-none  btn-sm text-base-content">
            Edit Profile
          </Link>

          <button
            onClick={handleDeleteAccount}
            className="btn btn-outline shadow-none btn-sm btn-error">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
