import { Link, NavLink } from "react-router-dom";
import Container from "../../../Responsive/Container";
import ThemeToggle from "../../../../Components/Theme/ToggleTheme";

import { TbTruckDelivery } from "react-icons/tb";
import { FaBars } from "react-icons/fa";

const MenuLink = (
  <>
    <div className="flex flex-col  lg:flex-row gap-3 md:gap-6  items-center justify-center font-medium capitalize text-base ">
      <NavLink to={"/service"}>service</NavLink>
      <NavLink to={"/coverage"}>Coverage</NavLink>
      <NavLink to={"/about"}>about</NavLink>
      <NavLink to={"/service"}>pricing</NavLink>
      <NavLink to={"/blog"}>blog</NavLink>
      <NavLink to={"/contact"}>contact</NavLink>
    </div>
  </>
);

const Navbar = () => {
  return (
    <div className="bg-base-100 shadow-sm">
      <Container>
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden">
                <FaBars size={20} />
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                {MenuLink}
              </ul>
            </div>
            <a className="font-bold text-xl flex gap-1 justify-center items-center ">
              <span className="hidden sm:flex">
                <TbTruckDelivery size={30} />
              </span>{" "}
              Go Deliver
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{MenuLink}</ul>
          </div>
          <div className="navbar-end ">
            <div className="flex items-center space-x-10">
              <div>
                <ThemeToggle />
              </div>
              <div className="space-x-3 hidden md:flex">
                <Link to={"/login"} className="btn">
                  Signin
                </Link>
                <Link to={"/be-a-order"} className="btn">
                  Be a rider
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
