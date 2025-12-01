import React from "react";

const AccountSecurity = () => {
  return (
    <div>
      <div className="mb-8 ">
        <h2 className="text-2xl font-bold mb-2">Security Setting</h2>
        <p className="text-base-content/70">Manege your account Security</p>
      </div>
      {/* Email Change */}
      <div className="card bg-primary/10 border border-primary shadow-sm mb-5">
        <div className="card-body">
          <h3 className="card-title">Change Email Address</h3>
          <p className="text-base-content/70">
            We'll send a verification link to your new email address
          </p>

          <form className="mt-4">
            <div className="form-control">
              <div>
                <input
                  type="text"
                  className=" input input-md rounded-sm border bg-base-200 shadow-none"
                  placeholder="Enter new email "
                />
              </div>
            </div>

            <div className="card-actions  justify-end mt-4">
              <button className="btn btn-primary text-base-content btn-md shadow-none">
                Update Email
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* password change section */}
      <div className="card bg-base-100/20 border border-base-100 mb-5 shadow-sm ">
        <div className="card-body">
          <h3 className="card-title">Change Password</h3>
          <p className="text-base-content/70">
            Create a strong password with letters, numbers, and symbols
          </p>

          <form className="mt-4 space-y-4 ">
            <div className="form-control flex flex-col space-y-2">
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>
              <input
                type="password"
                className="input input-md rounded-sm border bg-base-200 shadow-none"
                placeholder="Enter current password"
              />
            </div>

            <div className="form-control flex flex-col space-y-2">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                type="password"
                className="input input-md rounded-sm border bg-base-200 shadow-none"
                placeholder="Enter new password"
              />
            </div>

            <div className="form-control flex flex-col space-y-2">
              <label className="label">
                <span className="label-text">Confirm New Password</span>
              </label>
              <input
                type="password"
                className="input input-md rounded-sm border bg-base-200 shadow-none"
                placeholder="Confirm new password"
              />
            </div>

            <div className="card-actions justify-end mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-md  shadow-none text-base-content">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
      {/*  to factor authentication */}
      <div className="card bg-accent/10 border border-accent/30 shadow-sm">
        <div className="card-body">
          <h3 className="card-title">Two-Factor Authentication</h3>
          <p className="text-base-content/70">
            Add an extra layer of security to your account
          </p>

          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="font-medium">Authenticator App</div>
              <div className="text-sm text-base-content/70">
                Use an app like Google Authenticator
              </div>
            </div>
            <button className="btn  btn-md bg-accent outline-none">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
