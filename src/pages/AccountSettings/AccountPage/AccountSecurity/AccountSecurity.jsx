import React from "react";

const AccountSecurity = () => {
  return (
    <div>
      <div className="mb-8 ">
        <h2 className="text-2xl font-bold mb-2">Profile Information</h2>
        <p className="text-base-content/70">Update your personal details</p>
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
