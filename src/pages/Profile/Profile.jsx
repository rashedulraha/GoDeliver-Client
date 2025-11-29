import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCircleRemove } from "react-icons/ci";
import axios from "axios";
import { FaEdit, FaSave } from "react-icons/fa";

const Profile = () => {
  const { user, loading, deleteAccount, updateUserProfile, updateUserEmail } =
    useAuth();
  const [updatePLoading, setUpdatePLoading] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const navigate = useNavigate();
  const openModalRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const displayName = user?.displayName;
  const photoURL = user?.photoURL;
  const email = user?.email;

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleOpenModalToForm = () => {
    openModalRef.current.showModal();
  };

  const handleUpdateProfileWithModal = (data) => {
    setUpdatePLoading(true);
    const profileImage = data.image[0];
    const formData = new FormData();
    formData.append("image", profileImage);

    const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_HOST_KEY
    }`;

    axios.post(image_Api_Url, formData).then((res) => {
      // update profile here

      const userProfile = {
        displayName: data.name,
        photoURL: res.data.data.url,
      };

      updateUserProfile(userProfile)
        .then(() => {
          toast.success("Your profile has ben updated");
          openModalRef.current.close();
          setUpdatePLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };

  const handleCloseModal = () => {
    openModalRef.current.close();
  };

  //! handle edit email
  const handleEditEmail = () => {
    setEmailField(true);
  };
  
  //! handle save email
  const handleSaveEmail = (data) => {
    const email = data.email;

    if (!email === "") {
      return toast.error("Not change your email");
    }

    updateUserEmail(email)
      .then(() => {
        setEmailField(false);
        toast.success("successfully email updated");
      })
      .catch((error) => {
        toast("Network Error");
      });
  };

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
        <div className="flex items-center gap-3">
          {/* Email field */}
          {emailField ? (
            <>
              <form
                onSubmit={handleSubmit(handleSaveEmail)}
                className="flex items-center  gap-2">
                <label className="label">
                  <span className="label-text">Email :</span>
                </label>

                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  className={`input input-sm w-full bg-base-200 text-base-content outline-none shadow-none ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="Email"
                />

                {errors.email && (
                  <p className="text-error text-sm mt-1">
                    {errors.email.type === "required"
                      ? "Email is required"
                      : "Please enter a valid email"}
                  </p>
                )}
              </form>
            </>
          ) : (
            <label>{email}</label>
          )}

          {emailField ? (
            <span className="cursor-pointer" onClick={handleSaveEmail}>
              <FaSave size={18} />
            </span>
          ) : (
            <span className="cursor-pointer" onClick={handleEditEmail}>
              <FaEdit size={18} />
            </span>
          )}
        </div>
        <div className="divider"></div>
        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3 w-full items-center justify-center">
          <Link
            to="/dashboard"
            className="btn btn-primary shadow-none  btn-sm text-base-content">
            Dashboard
          </Link>
          <button
            onClick={handleOpenModalToForm}
            className="btn btn-accent shadow-none  btn-sm text-base-content">
            Edit Profile
          </button>

          <button
            onClick={handleDeleteAccount}
            className="btn btn-outline shadow-none btn-sm btn-error">
            Delete Account
          </button>
        </div>
      </div>

      {/*  update profile using modal form  */}
      <dialog
        ref={openModalRef}
        className="modal modal-bottom sm:modal-middle relative">
        <div className="modal-box relative">
          <button
            onClick={handleCloseModal}
            className=" absolute top-3 right-3 rounded-full hover:bg-primary  cursor-pointer">
            <CiCircleRemove size={30} />
          </button>
          <h3 className="font-bold text-lg">Update profile</h3>
          <p className="py-4">
            Please enter your valid information and update your profile
          </p>
          <div className="modal-action">
            <form
              method="dialog"
              // eslint-disable-next-line react-hooks/refs
              onSubmit={handleSubmit(handleUpdateProfileWithModal)}>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className={`input input-sm w-full bg-base-200 text-base-content outline-none  shadow-none ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="Your name"
              />
              {errors.name?.type === "required" && (
                <p className="text-error text-sm mt-1">Name is required</p>
              )}

              {/* Photo Image */}
              <label className="label">
                <span className="label-text">Profile Image</span>
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className={`file-input bg-base-200 text-base-content outline-none  shadow-none input-sm w-full ${
                  errors.image ? "file-input-error" : ""
                }`}
              />
              {errors.image?.type === "required" && (
                <p className="text-error text-sm mt-1">Photo is required</p>
              )}
              <button
                type="submit"
                className="btn shadow-md-none bg-primary outline-none text-base-content  mt-5 border-none w-full">
                {updatePLoading ? (
                  <span className="loading loading-infinity loading-md text-white">
                    Updating
                  </span>
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
