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
                  className=" input input-sm rounded-sm border bg-base-200 shadow-none"
                  placeholder="Enter new email "
                />
              </div>
            </div>

            <div className="card-actions  justify-end mt-4">
              <button className="btn btn-primary text-base-content btn-sm shadow-none">
                Update Email
              </button>
            </div>
          </form>
        </div>
      </div>

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
            <button className="btn  btn-sm bg-accent outline-none">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
