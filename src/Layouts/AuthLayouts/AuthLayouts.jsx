import React from "react";
import { Outlet } from "react-router-dom";
import DeliveryImage from "../../assets/image.png";
import Container from "../../pages/Responsive/Container";
import { TbTruckDelivery } from "react-icons/tb";

const AuthLayouts = () => {
  return (
    <Container>
      <div className="navbar">
        <a
          href="/"
          className="font-bold text-xl flex gap-1 justify-center items-center ">
          <span className="hidden sm:flex">
            <TbTruckDelivery size={30} />
          </span>{" "}
          Go Deliver
        </a>
      </div>
      <div className="flex flex-col md:flex-row gap-10 items-center justify-between h-screen">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="flex-1">
          <img className="rounded-md" src={DeliveryImage} alt="" />
        </div>
      </div>
    </Container>
  );
};

export default AuthLayouts;
