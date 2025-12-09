import { Link } from "react-router-dom";
import Container from "../../../Responsive/Container";
import ThemeToggle from "../../../../Components/Theme/ToggleTheme";
import { TbTruckDelivery } from "react-icons/tb";
import { FaBars, FaUser } from "react-icons/fa";
import CustomNavLink from "./Shared/CustomNavLink";
import ActionButton from "./Shared/ActionButton";
import useAuth from "../../../../Hooks/useAuth";
import { IoMdArrowDropdown, IoMdSettings } from "react-icons/io";
import LoginNavLink from "./Shared/LoginNavLink";
import { MdOutlineTrackChanges, MdSendAndArchive } from "react-icons/md";

import { useState } from "react";
import BeARider from "../../Button/BeARider";
import { Bike } from "lucide-react";

const dropdown = [
  { to: "", label: "Grocery Delivery" },
  { to: "", label: "Ride Sharing" },
  { to: "", label: "Courier Service" },
  { to: "", label: "Home Services" },
];

//! login user

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  //!  handle open submenuBar
  const handleEnter = () => {
    setOpen(true);
  };
  const handleLeave = () => {
    setOpen(false);
  };

  //!  Menu link

  const MenuLink = (
    <>
      <div className="flex flex-col lg:flex-row gap-3 md:gap-6  items-center justify-center font-medium text-base-content  ">
        <CustomNavLink to={""} label={"Home"} />
        <CustomNavLink to={"coverage"} label={"Coverage"} />
        <CustomNavLink to={"about"} label={"About"} />
        <CustomNavLink to={"pricing"} label={"Pricing"} />
        <CustomNavLink to={"blog"} label={"Blog"} />
        <CustomNavLink to={"contact"} label={"Contact"} />

        <div className="relative inline-block ">
          <div
            className="cursor-pointer"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}>
            <span className="flex items-center text-base-content/50 justify-center gap-1">
              Service <IoMdArrowDropdown size={20} />
            </span>

            {open && (
              <div className="absolute w-64 z-50">
                <div className="pt-[22px]">
                  <div className="bg-base-200 border border-base-100  backdrop-blur-xl rounded-b-md">
                    {dropdown.map((item, index) => (
                      <Link
                        key={index}
                        to={`/${item.to}`}
                        className="block px-4 py-2 hover:bg-primary/20 transition-all  last:rounded-b-md">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <BeARider
          to={"be-a-rider"}
          value={"Be a Rider"}
          className={"bg-primary text-base-content w-full md:hidden"}
        />
      </div>
    </>
  );

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
                className="-full border hover:bg-base-200 hover:text-base-content transition-all w-8 md:w-10 h-8 md:h-10 cursor-pointer rounded-full object-cover"
                src={photoURL}
                alt="user Image"
              />
            </div>
          )}
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-200  z-9999 mt-5 md:mt-[13px] w-64 border border-base-300 px-0  rounded-sm backdrop-blur-2xl">
          <LoginNavLink to="Profile" label="Profile" Icon={FaUser} />

          <LoginNavLink
            to="send-parcel"
            label="Send Parcel"
            Icon={MdSendAndArchive}
          />
          <LoginNavLink
            to="track-parcel"
            label="Track Parcel"
            Icon={MdOutlineTrackChanges}
          />

          <LoginNavLink
            to="account-setting"
            label="Account Settings"
            Icon={IoMdSettings}
          />

          <Link
            to={"/dashboard"}
            className="btn btn-md btn-primary bg-primary text-base-content rounded-full   shadow-none cursor-pointer mt-3  mx-3 ">
            Dashboard
          </Link>
        </ul>
      </div>
    </>
  );

  return (
    <div className=" text-base-content sticky top-0 z-50 shadow-md  backdrop-blur-2xl">
      <Container>
        <div className="navbar">
          {/* Logo */}
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost lg:hidden text-base-content ">
                <FaBars size={22} />
              </label>
              <ul className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-4   border-base-200">
                {MenuLink}
              </ul>
            </div>

            <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
              <Bike className="text-primary" size={28} />
              <span className="hidden sm:inline">Go Deliver</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base-content/90">
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
                  className={"btn-outline border text-primary"}
                />
              )}

              <div className="hidden md:flex">
                <BeARider
                  to={"be-a-rider"}
                  value={"Be a Rider"}
                  className={"bg-primary text-base-content"}
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
