import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import ButtonLoading from "../../Shared/Loading/ButtonLoading";
import GoogleLogin from "../../Shared/GoogleLogin/GoogleLogin";
import axios from "axios";

const Register = () => {
  const { registerUser, loading, updateUserProfile, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(registerUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitData = (data) => {
    // console.log(data.image);

    const profileImage = data.image[0];

    registerUser(data.email, data.password)
      .then(() => {
        navigate(location.state || "/");
        toast.success("Signup successfully");

        //? store the image and get the photo url

        const formData = new FormData();
        formData.append("image", profileImage);

        const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;

        axios.post(image_Api_Url, formData).then((res) => {
          console.log("after image uploaded");

          // update profile here

          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateUserProfile(userProfile)
            .then()
            .catch((error) => {
              console.log(error.message);
            });
        });
      })
      .catch(() => {
        toast.error("Network error please try again");
      });
  };

  if (user) {
    return <Navigate to={"/"} replace />;
  }

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
            className={`input input-md w-full bg-base-200 text-base-content outline-none  shadow-none ${
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
            className={`file-input bg-base-200 text-base-content outline-none  shadow-none input-md w-full ${
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
            className={`input input-md w-full bg-base-200 text-base-content outline-none  shadow-none ${
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
            className={`input bg-base-200 text-base-content outline-none  shadow-none input-md w-full ${
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
              <Link
                state={location.state}
                to="/forgot"
                className=" text-info link link-hover">
                Forgot password?
              </Link>
            </label>
          </div>

          {/* Register Button */}
          <button className="btn btn-primary text-base-content mt-4 btn-md shadow-none">
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
