import React from "react";
import Container from "../../pages/Responsive/Container";
import { TbTruckDelivery } from "react-icons/tb";
import ThemeToggle from "../../Components/Theme/ToggleTheme";
import { Outlet } from "react-router-dom";
import { GrDeliver } from "react-icons/gr";

const AuthLayouts = () => {
  return (
    <div className="overflow-hidden bg-primary text-base-100 min-h-screen">
      {/* Navbar */}
      <div className="navbar justify-between shadow-md bg-primary text-base-100">
        <Container>
          <div className="flex items-center justify-between">
            <a href="/" className="font-bold text-xl flex gap-1 items-center">
              <span className="hidden sm:flex">
                <TbTruckDelivery size={30} />
              </span>
              Go Deliver
            </a>

            <ThemeToggle />
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <div className="w-full h-full">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-5 md:py-10">
            {/* Outlet Content */}
            <div className="w-full">
              <Outlet />
            </div>

            {/* Right Side Icon */}
            <div className="w-full items-center justify-center hidden md:flex">
              <GrDeliver size={400} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AuthLayouts;
