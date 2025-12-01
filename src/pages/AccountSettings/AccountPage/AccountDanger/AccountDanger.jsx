import React, { useRef } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";

const AccountDanger = () => {
  const OpenModalToDeleteAccount = useRef();
  // const { deleteAccount } = useAuth();
  // const navigate = useNavigate();

  // delete account
  // const handleDelete = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "This action is permanent!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#ef4444",
  //     cancelButtonColor: "#94a3b8",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((res) => {
  //     if (res.isConfirmed) {
  //       deleteAccount().then(() => {
  //         navigate("/register");
  //         toast.success("Account deleted!");
  //       });
  //     }
  //   });
  // };

  const handleOpenModal = () => {
    console.log("clicked");

    OpenModalToDeleteAccount.current.showModal();
  };

  const handleCloseModal = () => {
    OpenModalToDeleteAccount.current.close();
  };

  return (
    <div>
      <div className="mb-8 ">
        <h2 className="text-2xl text-error font-bold mb-2">Danger Zone</h2>
        <p className="text-base-content/70">Update your personal details</p>
      </div>
      <div className="bg-error/10 border border-error/30 rounded-md p-3">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2 text-left">
            Delete Account ?
          </h3>
          <p className="text-base-content/70 mb-6 text-left">
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </p>

          <div className="flex justify-end">
            <button
              className="btn bg-error/30 border-error btn-md shadow-none text-base-content"
              onClick={handleOpenModal}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <div className="bg-warning/10 border border-warning/30 rounded-md p-3 mt-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2 text-left">
            Deactivate Account
          </h3>
          <p className="text-base-content/70 mb-6 text-left">
            Temporarily deactivate your account. You can reactivate it later.
          </p>

          <div className="flex justify-end">
            <button className="btn btn-warning btn-md shadow-none text-base-content bg-warning/30">
              Detective account
            </button>
          </div>
        </div>
      </div>

      {/*  input user feedback and continue delete account with open modal  */}

      <dialog
        ref={OpenModalToDeleteAccount}
        className="modal modal-bottom sm:modal-middle ">
        <form
          method="dialog"
          className="modal-box bg-base-100 flex flex-col gap-4 relative">
          <h3 className="font-bold text-lg text-error">Delete Account</h3>
          <p className="text-sm text-base-content/60">
            We're sorry to see you go! Please provide your feedback before
            deleting your account.
          </p>

          {/* Feedback Textarea */}
          <textarea
            className="textarea textarea-bordered w-full bg-base-200 shadow-none focus:outline-none"
            placeholder="Tell us why you're leaving..."
            required></textarea>

          <div className="modal-action">
            <button
              type="submit"
              className="btn  bg-error  shadow-none border-error text-base-content">
              Delete Account
            </button>
          </div>

          <div
            onClick={handleCloseModal}
            className="rounded-full p-1 hover:bg-primary w-fit transition cursor-pointer fill-accent-content absolute top-3 right-3">
            <CgClose />
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default AccountDanger;
