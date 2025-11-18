import { Link } from "react-router-dom";

const Profile = () => {
  const user = {
    name: "Rashedul",
    email: "rashed@gamil.com",
    photo:
      "https://img.freepik.com/free-photo/baby-with-stuffed-animal_52683-124509.jpg?semt=ais_hybrid&w=740&q=80",
  };

  return (
    <div className="card bg-primary text-base-100 w-full max-w-md mx-auto my-5">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl font-bold mb-4">My Profile</h2>

        {/* Profile Image */}
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
            <img src={user.photo} alt="User Profile" />
          </div>
        </div>

        {/* Name */}
        <h3 className="text-xl font-semibold mt-4">{user.name}</h3>

        {/* Email */}
        <p className="text-base-200 text-sm">{user.email}</p>

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

          <button className="btn btn-error btn-sm shadow-none text-base-100">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
