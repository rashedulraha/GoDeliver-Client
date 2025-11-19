import React from "react";
import Container from "../../pages/Responsive/Container";
import { TbTruckDelivery } from "react-icons/tb";

import ThemeToggle from "../../Components/Theme/ToggleTheme";
import { Outlet } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";

const AuthLayouts = () => {
  return (
    <div className="min-h-screen bg-primary text-base-100 overflow-hidden flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-primary shadow-lg border-b border-base-200">
        <Container>
          <div className="flex w-full justify-between items-center py-2">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2 font-black text-2xl tracking-tight hover:opacity-90 transition">
              <TbTruckDelivery size={36} className="text-accent" />
              <span className="hidden sm:inline">Go Deliver</span>
              <span className="sm:hidden">GD</span>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </Container>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center max-w-7xl mx-auto">
            {/* Left Side - Form (Outlet) */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <Outlet />
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                <CiDeliveryTruck
                  size={420}
                  className="text-accent drop-shadow-2xl animate-pulse-slow"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Optional Footer */}
      <div className="py-6 text-center text-sm opacity-70 border-t border-base-200">
        <Container>
          © 2025 Go Deliver • Fastest Parcel Delivery in Bangladesh
        </Container>
      </div>
    </div>
  );
};

export default AuthLayouts;
