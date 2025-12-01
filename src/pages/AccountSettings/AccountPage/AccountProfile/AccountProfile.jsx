import React from "react";

const AccountProfile = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-8 ">
        <h2 className="text-2xl font-bold mb-2">Profile Information</h2>
        <p className="text-base-content/70">Update your personal details</p>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col md:flex-row gap-6  ">
          <div className="w-full">
            <div className="mb-4">
              <label
                htmlFor="parcelName"
                className=" text-sm font-medium mb-2 ">
                Full Name
              </label>
              <input
                id="parcelName"
                type="text"
                className="w-full input input-md rounded-sm border bg-base-200 outline-none shadow-none mt-3"
                placeholder="Enter full name"
              />
            </div>

            <div className="w-full">
              <label htmlFor="parcelName" className=" text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="parcelName"
                type="text"
                className="w-full input input-md rounded-sm border bg-base-200 outline-none shadow-none mt-3"
                placeholder="Enter your email "
              />
            </div>
          </div>
          <div className="w-full">
            <div className="mb-4">
              <label htmlFor="parcelName" className=" text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                id="parcelName"
                type="text"
                className="w-full input input-md rounded-sm border bg-base-200 outline-none shadow-none mt-3"
                placeholder="Enter valid phone number"
              />
            </div>
            <div className="w-full">
              <label htmlFor="parcelName" className=" text-sm font-medium mb-2">
                NID Card
              </label>
              <input
                id="parcelName"
                type="text"
                className="w-full input input-md rounded-sm border bg-base-200 outline-none shadow-none mt-3"
                placeholder="Enter your national id card "
              />
            </div>
          </div>
        </div>
        <div className="flex items-end justify-end mt-8 md:mt-0  ">
          <button className="btn btn-md shadow-none border-none bg-primary">
            Save Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
