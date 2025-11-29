"use client";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { CiCircleRemove } from "react-icons/ci";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, loading, updateUserProfile, deleteAccount } = useAuth();
  const [updating, setUpdating] = useState(false);
  const modalRef = useRef();
  const { register, handleSubmit } = useForm();

  if (loading) return <LoadingSpinner />;

  const openModal = () => modalRef.current.showModal();
  const closeModal = () => modalRef.current.close();

  // update profile modal submit
  const handleUpdateProfile = async (data) => {
    setUpdating(true);

    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const uploadURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_HOST_KEY
    }`;

    try {
      const uploadRes = await axios.post(uploadURL, formData);

      const updatedInfo = {
        displayName: data.name,
        photoURL: uploadRes.data.data.url,
      };

      await updateUserProfile(updatedInfo);

      toast.success("Profile updated successfully!");
      closeModal();
      setUpdating(false);
    } catch (err) {
      toast.error("Profile update failed");
      setUpdating(false);
    }
  };

  // delete account
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action is permanent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteAccount().then(() => {
          toast.success("Account deleted!");
        });
      }
    });
  };

  return (
    <div className="max-w-md mx-auto card bg-base-200 mt-10 shadow-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>

      <div className="flex flex-col items-center">
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-accent ring-offset-2">
            <img src={user?.photoURL} />
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-4">{user?.displayName}</h3>
        <p className="text-base-content">{user?.email}</p>

        <div className="divider"></div>

        <div className="flex flex-col gap-3 w-full">
          <Link
            to="/dashboard"
            className="btn btn-sm shadow-none btn-primary w-full">
            Go to Dashboard
          </Link>

          <Link
            to="/account-settings"
            className="btn btn-accent w-full btn-sm shadow-none">
            Account Settings
          </Link>

          <button
            onClick={openModal}
            className="btn  btn-info w-full btn-sm shadow-none">
            Edit Basic Profile
          </button>

          <button
            onClick={handleDelete}
            className="btn btn-error btn-outline w-full btn-sm shadow-none">
            Delete Account
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <button onClick={closeModal} className="absolute right-3 top-3">
            <CiCircleRemove size={30} />
          </button>

          <h3 className="font-bold text-lg mb-3">Update Profile</h3>

          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <label className="label">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("name")}
              className="input input-bordered w-full"
            />

            <label className="label mt-3">Profile Photo</label>
            <input
              type="file"
              {...register("image")}
              className="file-input w-full"
            />

            <button className="btn btn-primary w-full mt-5" type="submit">
              {updating ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Update"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
