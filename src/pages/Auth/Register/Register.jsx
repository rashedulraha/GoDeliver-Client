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
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <>
                  <p className="text-red-500">Password is required</p>
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
