import React from "react";
import { Outlet } from "react-router-dom";
import DeliveryImage from "../../assets/image.png";
import Container from "../../pages/Responsive/Container";
import { TbTruckDelivery } from "react-icons/tb";
import ThemeToggle from "../../Components/Theme/ToggleTheme";

const AuthLayouts = () => {
  return (
    <div>
      <div className="navbar justify-between shadow-md">
        <Container>
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="font-bold text-xl flex gap-1 justify-center items-center ">
              <span className="hidden sm:flex">
                <TbTruckDelivery size={30} />
              </span>{" "}
              Go Deliver
            </a>
            <ThemeToggle />
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex flex-col md:flex-row gap-10 items-center justify-between h-screen">
          <div className="flex-1">
            <Outlet />
          </div>
          <div className="flex-1">
            <img className="rounded-md" src={DeliveryImage} alt="" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AuthLayouts;
