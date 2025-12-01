import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import ButtonLoading from "../../Shared/Loading/ButtonLoading";
import GoogleLogin from "../../Shared/GoogleLogin/GoogleLogin";

const Login = () => {
  const { loading, user } = useAuth();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signinUser } = useAuth();

  const navigate = useNavigate();

  const handleLogin = (data) => {
    signinUser().then(() => {
      navigate(location.state || "/");
    });
    console.log("Login data:", data);
  };

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="card text-base-content w-full max-w-md mx-auto shadow-md">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">
            Login
          </h2>

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
            className={`input input-md w-full bg-base-200 text-base-content outline-none shadow-none ${
              errors.email ? "input-error" : ""
            }`}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">
              {errors.email.type === "required"
                ? "Email is required"
                : "Enter a valid email"}
            </p>
          )}

          {/* Password */}
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className={`input input-md w-full bg-base-200 text-base-content  outline-none shadow-none ${
              errors.password ? "input-error" : ""
            }`}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-error text-sm mt-1">
              {errors.password.type === "required"
                ? "Password is required"
                : "Password must be at least 6 characters"}
            </p>
          )}

          {/* Forgot + Register */}
          <div className="flex justify-between items-center mt-4">
            <Link
              to="/register"
              state={location.state}
              className="link text-info link-hover">
              Create account
            </Link>

            <Link to="/forgot" className="link text-info link-hover">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button className="btn btn-primary text-base-content mt-4 btn-md shadow-none">
            {loading ? <ButtonLoading /> : "Login"}
          </button>

          <div className="divider">OR</div>

          {/* Google login  */}
          <GoogleLogin />
        </div>
      </div>
    </form>
  );
};

export default Login;
