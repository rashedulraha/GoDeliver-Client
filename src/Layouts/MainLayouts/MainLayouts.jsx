import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../pages/Shared/Navigation/Navbar/Navbar";
import Footer from "../../pages/Shared/Navigation/Footer/Footer";

const MainLayouts = () => {
  return (
    <div className="flex flex-col h-screen bg-primary">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayouts;
