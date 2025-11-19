import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";

const Profile = () => {
  const { user, loading } = useAuth();
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;
  const email = user?.email;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="card bg-primary text-base-100 w-full max-w-md mx-auto my-5">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl font-bold mb-4">My Profile</h2>

        {/* Profile Image */}
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
            <img src={photoURL} alt="User Profile" />
          </div>
        </div>

        {/* Name */}
        <h3 className="text-xl font-semibold mt-4">{displayName}</h3>

        {/* Email */}
        <p className="text-base-200 text-sm">{email}</p>

        <div className="divider"></div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Link
            to="/edit-profile"
            className="btn btn-accent shadow-none  btn-sm text-base-100">
            Edit Profile
          </Link>

          <Link
            to="/change-password"
            className="btn btn-outline shadow-none btn-sm btn-accent">
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
