import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import ButtonLoading from "../../Shared/Loading/ButtonLoading";
import GoogleLogin from "../../Shared/GoogleLogin/GoogleLogin";

const Register = () => {
  const { registerUser, loading } = useAuth();
  const navigate = useNavigate();

  console.log(registerUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitData = (data) => {
    registerUser(data.email, data.password)
      .then(() => {
        navigate("/");
        toast.success("Signup successfully");
      })
      .catch(() => {
        toast.error("Network error please try again");
      });
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <div className="card bg-base-200 text-base-content w-full max-w-md mx-auto">
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
            className={`input input-sm w-full bg-base-200 text-base-content outline-none  shadow-none ${
              errors.name ? "input-error" : ""
            }`}
            placeholder="Your name"
          />
          {errors.name?.type === "required" && (
            <p className="text-error text-sm mt-1">Name is required</p>
          )}

          {/* Photo Image */}
          <label className="label">
            <span className="label-text">Profile Image</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className={`file-input bg-base-200 text-base-content outline-none  shadow-none input-sm w-full ${
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
            className={`input input-sm w-full bg-base-200 text-base-content outline-none  shadow-none ${
              errors.email ? "input-error" : ""
            }`}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">
              {errors.email.type === "required"
                ? "Email is required"
                : "Please enter a valid email"}
            </p>
          )}

          {/* Password field */}
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            className={`input bg-base-200 text-base-content outline-none  shadow-none input-sm w-full ${
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
          {errors.password && (
            <p className="text-error text-sm mt-1">
              {errors.password.type === "required"
                ? "Password is required"
                : errors.password.type === "minLength"
                ? "Password must be 6 characters or longer"
                : "Password must include upper, lower & number"}
            </p>
          )}

          {/* Forgot Password */}
          <div className="flex justify-between items-center mt-4">
            <label className="label">
              <Link to="/login" className="link text-info link-hover">
                Login
              </Link>
            </label>
            <label className="label">
              <Link to="/forgot" className=" text-info link link-hover">
                Forgot password?
              </Link>
            </label>
          </div>

          {/* Register Button */}
          <button className="btn btn-primary text-base-content mt-4 btn-sm shadow-none">
            {loading ? <ButtonLoading /> : "Register"}
          </button>

          <div className="divider">OR</div>

          {/* Login with Google*/}
          <GoogleLogin />
        </div>
      </div>
    </form>
  );
};

export default Register;
