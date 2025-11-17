import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitData = (data) => {
    console.log("After registration:", data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="card bg-base-100 w-full  max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              {/* Name field */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input "
                placeholder="your name"
              />

              {errors.email?.type === "required" && (
                <>
                  <p className="text-red-500">Name is required</p>
                </>
              )}
              {/* Photo Image field */}
              <label className="label">Image</label>
              <input
                type="file"
                {...register("Image", { required: true })}
                className="file-input "
                placeholder="your photo image"
              />

              {errors.email?.type === "required" && (
                <>
                  <p className="text-red-500">photo is required</p>
                </>
              )}

              {/* email field */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input "
                placeholder="Email"
              />

              {errors.email?.type === "required" && (
                <>
                  <p className="text-red-500">Email is required</p>
                </>
              )}

              {/* password  field */}
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
                })}
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <>
                  <p className="text-red-500">Password is required</p>
                </>
              )}
              {errors.password?.type === "minLength" && (
                <>
                  <p className="text-red-500">
                    Password most be 6 characters or longer
                  </p>
                </>
              )}
              {errors.password?.type === "pattern" && (
                <>
                  <p className="text-red-500">
                    Password most including uppercase and lowercase and one
                    number
                  </p>
                </>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
