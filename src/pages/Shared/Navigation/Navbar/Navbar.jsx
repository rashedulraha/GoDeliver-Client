import { Link, NavLink } from "react-router-dom";
import Container from "../../../Responsive/Container";
import ThemeToggle from "../../../../Components/Theme/ToggleTheme";

import { TbTruckDelivery } from "react-icons/tb";
import { FaBars, FaHandsHelping, FaListUl, FaUser } from "react-icons/fa";
import CustomNavLink from "./Shared/CustomNavLink";
import ActionButton from "./Shared/ActionButton";
import useAuth from "../../../../Hooks/useAuth";
import { IoIosAddCircle } from "react-icons/io";
import LoginNavLink from "./Shared/LoginNavLink";

const MenuLink = (
  <>
    <div className="flex flex-col lg:flex-row gap-3 md:gap-6  items-center justify-center font-medium text-base text-base-100 ">
      <CustomNavLink to={"service"} value={"Service"} />
      <CustomNavLink to={"coverage"} value={"Coverage"} />
      <CustomNavLink to={"about"} value={"About"} />
      <CustomNavLink to={"pricing"} value={"Pricing"} />
      <CustomNavLink to={"blog"} value={"Blog"} />
      <CustomNavLink to={"contact"} value={"Contact"} />
      <CustomNavLink to={"track-parcel"} value={"Track Parcel"} />
    </div>
  </>
);

//! login user

const Navbar = () => {
  const { user } = useAuth();

  const loginUser = (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button">
          {user && (
            <div
              className="md:tooltip md:tooltip-bottom flex items-center justify-center"
              // data-tip={`${displayName}`}
            >
              <img
                className="-full border hover:bg-primary hover:text-white transition-all w-8 md:w-10 h-8 md:h-10 cursor-pointer rounded-full"
                // src={photoURL}
                alt="user Image"
              />
            </div>
          )}
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-primary rounded-box z-[9999] mt-5 md:mt-4 w-60 p-3 border border-base-300 space-y-3">
          <LoginNavLink to="profile" value="Profile" Icon={FaUser} />
          <LoginNavLink to="my-request" value="Profile" Icon={FaHandsHelping} />
          <LoginNavLink to="my-listings" value="My Listings" Icon={FaListUl} />
          <LoginNavLink
            to="payment-history"
            value="Payment History"
            Icon={IoIosAddCircle}
          />

          <button className="btn btn-primary rounded-full bg-base-100 text-primary shadow-none cursor-pointer">
            Logout
          </button>
        </ul>
      </div>
    </>
  );

  return (
    <div className="bg-primary text-base-100 sticky top-0 z-50 shadow-md border-b border-base-200">
      <Container>
        <div className="navbar py-4">
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
          <div className="navbar-end gap-4">
            <ThemeToggle />

            <div className="hidden items-center md:flex gap-3">
              {user ? (
                loginUser
              ) : (
                <ActionButton
                  to={"login"}
                  value={"Signin"}
                  className={"btn-outline bg-base-200 text-primary"}
                />
              )}
              <ActionButton
                to={"be-a-rider"}
                value={"Be a Rider"}
                className={"bg-accent"}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
