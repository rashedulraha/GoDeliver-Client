import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import ButtonLoading from "../../Shared/Loading/ButtonLoading";

const Forgot = () => {
  const { loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForgot = (data) => {
    console.log("Reset request for:", data.email);
  };

  return (
    <form onSubmit={handleSubmit(handleForgot)}>
      <div className="card bg-base-200 text-base-content w-full max-w-md mx-auto">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">
            Forgot Password
          </h2>

          <p className="text-sm text-base-200 text-center mb-4">
            Enter your email and we will send you reset instructions.
          </p>

          {/* Email */}
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            className={`input input-sm w-full bg-base-200 text-base-content outline-none shadow-none ${
              errors.email ? "input-error" : ""
            }`}
            placeholder="Enter your email"
          />

          {errors.email && (
            <p className="text-error text-sm mt-1">
              {errors.email.type === "required"
                ? "Email is required"
                : "Enter a valid email"}
            </p>
          )}

          {/* Reset Button */}
          <button className="btn btn-primary text-base-content mt-4 btn-sm shadow-none w-full">
            {loading ? <ButtonLoading /> : "Send Reset Link"}
          </button>

          <div className="divider">OR</div>

          {/* Back to login */}
          <Link
            to="/login"
            className="btn btn-outline btn-sm btn-accent hover:text-white w-full shadow-none">
            Back to Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Forgot;
