import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "../../../Responsive/Container";
import ThemeToggle from "../../../../Components/Theme/ToggleTheme";

import { TbTruckDelivery } from "react-icons/tb";
import { FaBars, FaListUl, FaUser } from "react-icons/fa";
import CustomNavLink from "./Shared/CustomNavLink";
import ActionButton from "./Shared/ActionButton";
import useAuth from "../../../../Hooks/useAuth";
import { IoIosAddCircle } from "react-icons/io";
import LoginNavLink from "./Shared/LoginNavLink";
import { MdDashboard, MdOutlineTrackChanges } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MenuLink = (
  <>
    <div className="flex flex-col lg:flex-row gap-3 md:gap-6  items-center justify-center font-medium text-base-100 ">
      <CustomNavLink
        to={"service"}
        label={"Service"}
        dropdown={[
          { to: "grocery-delivery", label: "Grocery Delivery" },
          { to: "parcel-delivery", label: "Parcel Delivery" },
          { to: "ride-sharing", label: "Ride Sharing" },
          { to: "courier-service", label: "Courier Service" },
          { to: "home-services", label: "Home Services" },
        ]}
      />
      <CustomNavLink to={"coverage"} label={"Coverage"} />
      <CustomNavLink to={"about"} label={"About"} />
      <CustomNavLink to={"pricing"} label={"Pricing"} />
      <CustomNavLink to={"blog"} label={"Blog"} />
      <CustomNavLink to={"contact"} label={"Contact"} />
    </div>
  </>
);

//! login user

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#1e293b",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#f87171",
      confirmButtonText: "Yes, me logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            navigate("/login");
            toast.success("Successfully Logout");
          })
          .catch(() => {
            toast.error("Network error please try again");
          });
      }
    });
  };

  const displayName = user?.displayName;
  const photoURL = user?.photoURL;

  const loginUser = (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button">
          {user && (
            <div
              className="md:tooltip md:tooltip-bottom flex items-center justify-center"
              data-tip={`${displayName}`}>
              <img
                className="-full border hover:bg-primary hover:text-white transition-all w-8 md:w-10 h-8 md:h-10 cursor-pointer rounded-full"
                src={photoURL}
                alt="user Image"
              />
            </div>
          )}
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-accent/10 p-0  z-9999 mt-6 md:mt-4 w-64 border border-base-300 space-y-3 py-3 rounded-sm backdrop-blur-2xl">
          <LoginNavLink to="dashboard" label="Dashboard" Icon={MdDashboard} />
          <LoginNavLink to="Profile" label="Profile" Icon={FaUser} />
          <LoginNavLink to="my-parcels" label="My Parcels" Icon={FaListUl} />
          <LoginNavLink
            to="send-parcel"
            label="Send Parcel"
            Icon={IoIosAddCircle}
          />
          <LoginNavLink
            to="track-parcel"
            label="Track Parcel"
            Icon={MdOutlineTrackChanges}
          />

          <button
            onClick={handleSignOut}
            className="btn btn-primary rounded-full bg-base-100 text-primary shadow-none cursor-pointer  mx-3 ">
            Logout
          </button>
        </ul>
      </div>
    </>
  );

  return (
    <div className="bg-primary text-base-100 sticky top-0 z-50 shadow-md border-b border-base-200">
      <Container>
        <div className="navbar">
          {/* Logo */}
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost lg:hidden text-base-100 ">
                <FaBars size={22} />
              </label>
              <ul className="menu menu-sm dropdown-content bg-primary rounded-box z-10 mt-3 w-52 p-4   border-base-200">
                {MenuLink}
              </ul>
            </div>

            <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
              <TbTruckDelivery size={34} color="#14b8a6" />
              <span className="hidden sm:inline">Go Deliver</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white/90">
              {MenuLink}
            </ul>
          </div>

          {/* Right Side */}
          <div className="navbar-end gap-4 flex items-center">
            <ThemeToggle />

            <div className=" flex justify-center items-center md:flex gap-3">
              {user ? (
                loginUser
              ) : (
                <ActionButton
                  to={"login"}
                  value={"Signin"}
                  className={"btn-outline bg-base-200 text-primary"}
                />
              )}

              <div className="hidden md:flex">
                <ActionButton
                  to={"be-a-rider"}
                  value={"Be a Rider"}
                  className={"bg-accent"}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
