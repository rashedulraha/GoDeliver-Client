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
    <form onSubmit={handleSubmit(handleSubmitData)} className="max-w-md">
      <div className="card bg-base-100 w-full">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">
            Register
          </h2>

          {/* Name field */}
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className={`input input-bordered input-sm w-full ${
              errors.name ? "input-error" : ""
            }`}
            placeholder="Your name"
          />
          {errors.name?.type === "required" && (
            <p className="text-error text-sm mt-1">Name is required</p>
          )}

          {/* Photo Image field */}
          <label className="label">
            <span className="label-text">Profile Image</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className={`file-input file-input-bordered input-sm w-full ${
              errors.image ? "file-input-error" : ""
            }`}
          />
          {errors.image?.type === "required" && (
            <p className="text-error text-sm mt-1">Photo is required</p>
          )}

          {/* Email field */}
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            className={`input input-bordered input-sm w-full ${
              errors.email ? "input-error" : ""
            }`}
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-error text-sm mt-1">Email is required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-error text-sm mt-1">
              Please enter a valid email
            </p>
          )}

          {/* Password field */}
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            className={`input input-bordered input-sm w-full ${
              errors.password ? "input-error" : ""
            }`}
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
            })}
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-error text-sm mt-1">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-error text-sm mt-1">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-error text-sm mt-1">
              Password must include uppercase and lowercase letters and one
              number
            </p>
          )}

          <div className="flex justify-between items-center mt-4">
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <button className="btn btn-primary mt-4 btn-sm shadow-none ">
            Register
          </button>

          <div className="divider">OR</div>

          <button className="btn btn-outline btn-sm btn-accent">
            Login with existing account
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
