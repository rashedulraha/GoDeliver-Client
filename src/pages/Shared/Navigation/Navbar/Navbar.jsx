import { Link, NavLink } from "react-router-dom";
import Container from "../../../Responsive/Container";
import ThemeToggle from "../../../../Components/Theme/ToggleTheme";

import { TbTruckDelivery } from "react-icons/tb";
import { FaBars } from "react-icons/fa";
import CustomNavLink from "./Shared/CustomNavLink";
import ActionButton from "./Shared/ActionButton";

const MenuLink = (
  <>
    <div className="flex flex-col lg:flex-row gap-3 md:gap-6  items-center justify-center font-medium text-base text-base-100">
      <CustomNavLink to={"service"} value={"Service"} />
      <CustomNavLink to={"coverage"} value={"Coverage"} />
      <CustomNavLink to={"about"} value={"About"} />
      <CustomNavLink to={"pricing"} value={"Pricing"} />
      <CustomNavLink to={"blog"} value={"Blog"} />
      <CustomNavLink to={"contact"} value={"Contact"} />
    </div>
  </>
);

const Navbar = () => {
  return (
    <div className="bg-primary text-base-100 sticky top-0 z-50 shadow-md">
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

            <div className="hidden md:flex gap-3">
              <ActionButton
                to={"login"}
                value={"Signin"}
                className={"btn-outline bg-base-200 text-primary"}
              />
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
