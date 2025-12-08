import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ThemeToggle from "../../Components/Theme/ToggleTheme";

import { GoHome, GoSidebarExpand } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { Bike, HelpCircle, LocateIcon, LogOut, Users } from "lucide-react";
import { LiaFileInvoiceSolid, LiaStoreSolid } from "react-icons/lia";
import {
  FaListUl,
  FaRegMoneyBillAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { PiPasswordDuotone } from "react-icons/pi";
import { MdSendAndArchive } from "react-icons/md";

import SidebarLink from "./shared/SidebarLink/SidebarLink";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { logoutUser, user } = useAuth();

  const navigate = useNavigate();

  // Logout Handler
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      background: "#1e293b",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: "#f87171",
      cancelButtonColor: " #14b8a6",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            navigate("/login");
            toast.success("Successfully Logged out");
          })
          .catch(() => toast.error("Network error! Try again"));
      }
    });
  };

  return (
    <div className="drawer lg:drawer-open bg-base-100 min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ------------- main dashboard content ------------- */}
      <div className="drawer-content flex flex-col">
        {/* ---------- NAVBAR ---------- */}
        <nav className="navbar flex items-center justify-between w-full bg-base-300 shadow-sm px-4 lg:px-6">
          <div className="flex items-center  gap-2">
            {/* Drawer Toggle for mobile */}
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost shadow-none">
              <GoSidebarExpand size={21} />
            </label>

            <h1 className="text-primary font-bold text-lg">Go Deliver</h1>
          </div>

          <div className="flex items-center gap-3">
            <h2>{user.displayName}</h2> <ThemeToggle />
          </div>
        </nav>

        {/* ---------- page outlet ---------- */}
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </div>

      {/* ------------- sidebar ------------- */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex flex-col bg-base-200 min-h-full is-drawer-close:w-16 is-drawer-open:w-64 border-r border-base-300 duration-300">
          {/* Sidebar Menu */}
          <ul className="menu w-full p-2 py-4 gap-1">
            <SidebarLink
              to="/"
              dataTip="Homepage"
              span="HomePage"
              Icon={GoHome}
            />
            <SidebarLink
              to=""
              dataTip="My Parcels"
              span="My Parcels"
              Icon={FaListUl}
            />

            <SidebarLink
              to="/send-parcel"
              dataTip="Send Parcel"
              span="Send Parcel"
              Icon={MdSendAndArchive}
            />

            <SidebarLink
              to="/dashboard/payment-history"
              dataTip="Invoices"
              span="Invoices"
              Icon={LiaFileInvoiceSolid}
            />
            <SidebarLink
              to="/dashboard/approve-rider"
              dataTip="Approve Rider"
              span="Approve Rider"
              Icon={Bike}
            />
            <SidebarLink
              to="/dashboard/user-management"
              dataTip="User management"
              span="users management"
              Icon={Users}
            />

            <SidebarLink
              to="/stores"
              dataTip="Stores"
              span="Stores"
              Icon={LiaStoreSolid}
            />

            <SidebarLink
              to="/coverage-area"
              dataTip="Coverage Area"
              span="Coverage Area"
              Icon={LocateIcon}
            />

            <SidebarLink
              to="/pricing-plan"
              dataTip="Pricing Plan"
              span="Pricing Plan"
              Icon={FaRegMoneyBillAlt}
            />

            <SidebarLink
              to="/account-setting"
              dataTip="Settings"
              span="Settings"
              Icon={IoSettingsOutline}
            />

            {/* Password */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-300 rounded-lg flex items-center gap-3 px-3 py-2">
                <PiPasswordDuotone size={20} />
                <span className="is-drawer-close:hidden">Password</span>
              </button>
            </li>

            {/* Help */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-300 rounded-lg flex items-center gap-3 px-3 py-2">
                <HelpCircle size={20} />
                <span className="is-drawer-close:hidden">Help</span>
              </button>
            </li>

            {/* Sidebar Footer */}
            <div className="border-t border-sidebar-border flex items-center is-drawer-close:flex-col is-drawer-open:flex-row  gap-2 mt-10 py-5">
              {/* Collapsed state avatar */}
              <Link to={"/profile"} className="  justify-center ">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border-2 border-sidebar-primary"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center">
                    <FaUserCircle size={16} />
                  </div>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-error/20 rounded-lg flex items-center gap-3 px-3 py-2 text-error font-semibold">
                <FaSignOutAlt size={20} />
                <span className="is-drawer-close:hidden ">Logout</span>
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
