import React from "react";

const AccountDanger = () => {
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
            <button className="btn bg-error/30 border-error btn-sm shadow-none text-base-content">
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
            <button className="btn btn-warning btn-sm shadow-none text-base-content bg-warning/30">
              Detective account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDanger;
