import React from "react";
import Container from "../../pages/Responsive/Container";
import { TbTruckDelivery } from "react-icons/tb";
import ThemeToggle from "../../Components/Theme/ToggleTheme";
import { Outlet } from "react-router-dom";
import { Package2, Shield, MapPin, Clock } from "lucide-react";

const AuthLayouts = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content flex flex-col">
      {/* Navbar */}
      <div className="navbar  sticky top-0 z-800 backdrop-blur-2xl shadow-md">
        <Container>
          <div className="flex w-full justify-between items-center py-3">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 font-black text-2xl">
              <TbTruckDelivery size={32} color="#0d6efd" />
              <span className="hidden sm:inline">Go Deliver </span>
              <span className="sm:hidden">GD</span>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </Container>
      </div>

      {/* Main Hero + Form Area */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center max-w-7xl mx-auto">
            {/* Left – Form */}
            <div className="order-2 lg:order-1  ">
              <div className="card  ">
                <Outlet />
              </div>
            </div>

            {/* Right – Hero Illustration */}
            <div className="order-1 lg:order-2 ">
              <div className="relative">
                {/* Badge on Truck */}

                <div className="text-center lg:text-left mb-8 pb-3 border-b border-base-200">
                  <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3 text-center ">
                    Welcome Back
                  </h2>
                  <p className="text-base-content/70 text-lg text-center">
                    Sign in to track and manage your parcels
                  </p>
                </div>

                {/* Feature Boxes */}
                <div className="grid grid-cols-2 gap-4 mt-12 max-w-sm mx-auto">
                  <div className="bg-base-100 rounded-md p-5 text-center shadow border border-base-300">
                    <Clock className="w-9 h-9 text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm">Same Day</p>
                  </div>
                  <div className="bg-base-100 rounded-md p-5 text-center shadow border border-base-300">
                    <MapPin className="w-9 h-9 text-accent mx-auto mb-2" />
                    <p className="font-medium text-sm">Live Tracking</p>
                  </div>
                  <div className="bg-base-100 rounded-md p-5 text-center shadow border border-base-300">
                    <Shield className="w-9 h-9 text-primary mx-auto mb-2" />
                    <p className="font-medium text-sm">100% Insured</p>
                  </div>
                  <div className="bg-base-100 rounded-md p-5 text-center shadow border border-base-300">
                    <div className="w-9 h-9 bg-accent rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                      24
                    </div>
                    <p className="font-medium text-sm">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Footer */}
      <div className="py-6 text-center text-sm opacity-70 border-t border-base-300 bg-base-100">
        <Container>
          © 2025 GoDeliver • Fastest Parcel Delivery in Bangladesh
        </Container>
      </div>
    </div>
  );
};

export default AuthLayouts;
