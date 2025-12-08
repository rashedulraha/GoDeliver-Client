import React from "react";
import Container from "../Responsive/Container";
// Make sure you have react-icons installed: npm install react-icons
import {
  FaMotorcycle,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Rider = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const handleSubmitForm = (data) => {
    const cleanedData = {
      ...data,
      fastName: data.fastName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phoneNumber: data.phoneNumber.trim(),
      city: data.city.trim(),
    };

    axiosSecure
      .post("/rider", cleanedData)
      .then(() => {
        toast.success("Successfully create rider");
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    // Main container with a subtle background and minimum height for full-screen feel
    <div className="min-h-screen bg-base-200">
      <Container>
        {/* Responsive padding: smaller on mobile, larger on desktop */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          {/* Header Section */}
          <div className="mb-6 sm:mb-8 lg:mb-10 text-center sm:text-left">
            {/* Responsive heading size */}
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-base-content">
              Be a Rider
            </h1>
            {/* Responsive paragraph width and text size */}
            <p className="text-sm sm:text-base text-base-content/70 mt-3 sm:mt-4 max-w-2xl mx-auto sm:mx-0">
              Join our team of professional riders and enjoy flexible work
              hours, competitive pay, and the freedom of being on the road.
            </p>
          </div>

          {/* Main content: stacks vertically on mobile, side-by-side on large screens */}
          <div className="flex flex-col xl:flex-row items-start gap-6 lg:gap-8 xl:gap-10">
            {/* Form Section */}
            <div className="flex-1 w-full">
              {/* Responsive sub-heading */}
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-base-content">
                Tell us about yourself
              </h2>
              <form
                className="space-y-4 sm:space-y-6"
                onSubmit={handleSubmit(handleSubmitForm)}>
                {/* Responsive grid: 1 column on small, 2 on medium+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base">
                        First Name
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("fastName", { required: true })}
                      placeholder="First name"
                      className="input input-bordered w-full text-sm sm:text-base"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base">
                        Last Name
                      </span>
                    </label>
                    <input
                      {...register("lastName", { required: true })}
                      type="text"
                      placeholder="Last name"
                      className="input input-bordered w-full text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base">
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      placeholder="your@email.com"
                      className="input input-bordered w-full text-sm sm:text-base"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base">
                        Phone Number
                      </span>
                    </label>
                    <input
                      type="tel"
                      {...register("phoneNumber", { required: true })}
                      placeholder="+880 1XXX XXXXXX"
                      className="input input-bordered w-full text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base">
                        Date of Birth
                      </span>
                    </label>
                    <input
                      {...register("dateOfBirth", { required: true })}
                      type="date"
                      className="input input-bordered w-full text-sm sm:text-base"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base">
                        City
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("city", { required: true })}
                      placeholder="Your city"
                      className="input input-bordered w-full text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-sm sm:text-base">
                      Preferred Warehouse
                    </span>
                  </label>
                  <select className="select select-bordered w-full text-sm sm:text-base">
                    <option disabled selected>
                      Select a warehouse
                    </option>
                    <option>Downtown Warehouse</option>
                    <option>North District Warehouse</option>
                    <option>East Side Warehouse</option>
                    <option>West End Warehouse</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm sm:text-base">
                      Do you have your own vehicle?
                    </span>
                  </label>
                  {/* Flexbox for radio buttons to stay on the same line */}
                  <div className="flex gap-4 sm:gap-6 mt-2">
                    <label className="cursor-pointer label justify-start gap-2">
                      <input
                        type="radio"
                        value="Yes"
                        {...register("vehicle", { required: true })}
                        className="radio checked:bg-accent radio-sm"
                      />
                      <span className="label-text">Yes</span>
                    </label>
                    <label className="cursor-pointer label justify-start gap-2">
                      <input
                        type="radio"
                        value="No"
                        {...register("vehicle", { required: true })}
                        className="radio checked:bg-accent radio-sm"
                      />
                      <span className="label-text">No</span>
                    </label>
                  </div>
                </div>

                <div className="form-control mt-6 sm:mt-8">
                  <button className="btn btn-primary w-full text-sm sm:text-base font-semibold">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>

            {/* Info Section - without .map() */}
            <div className="flex-1 w-full mt-8 xl:mt-0">
              <div className="bg-base-100/40 rounded-md p-4 sm:p-6 shadow-lg lg:shadow-xl">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-base-content">
                  Why Join Our Team?
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  {/* Item 1 */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-primary/10 p-2 sm:p-3 rounded-full shrink-0">
                      <FaMotorcycle className="text-primary text-lg sm:text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-base-content">
                        Flexible Schedule
                      </h4>
                      <p className="text-xs sm:text-sm text-base-content/70 mt-1">
                        Choose when and how much you want to work.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-primary/10 p-2 sm:p-3 rounded-full shrink-0">
                      <FaClock className="text-primary text-lg sm:text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-base-content">
                        Quick Payments
                      </h4>
                      <p className="text-xs sm:text-sm text-base-content/70 mt-1">
                        Get paid weekly with no delays.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-primary/10 p-2 sm:p-3 rounded-full shrink-0">
                      <FaShieldAlt className="text-primary text-lg sm:text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-base-content">
                        Insurance Coverage
                      </h4>
                      <p className="text-xs sm:text-sm text-base-content/70 mt-1">
                        Comprehensive insurance for all riders.
                      </p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-primary/10 p-2 sm:p-3 rounded-full shrink-0">
                      <FaMapMarkerAlt className="text-primary text-lg sm:text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-base-content">
                        Work Near Home
                      </h4>
                      <p className="text-xs sm:text-sm text-base-content/70 mt-1">
                        Choose routes in your preferred area.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-xs sm:text-sm text-base-content/80 text-center">
                    Join over 500+ riders who are already part of our growing
                    team!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Rider;
