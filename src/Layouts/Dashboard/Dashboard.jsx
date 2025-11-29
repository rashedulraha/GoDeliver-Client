import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ThemeToggle from "../../Components/Theme/ToggleTheme";
import { GoHome, GoSidebarExpand } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { HelpCircle, LocateIcon, LogOut } from "lucide-react";
import { LiaFileInvoiceSolid, LiaStoreSolid } from "react-icons/lia";
import { FaListUl, FaRegMoneyBillAlt } from "react-icons/fa";
import { PiPasswordDuotone } from "react-icons/pi";
import SidebarLink from "./shared/SidebarLink/SidebarLink";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#1e293b",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#f87171",
      confirmButtonText: "Yes, me logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            navigate("/login");
            toast.success("Successfully Logout");
          })
          .catch(() => {
            toast.error("Network error please try again");
          });
      }
    });
  };
  return (
    <div className="drawer lg:drawer-open bg-base-100 ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 flex items-center justify-between">
          <div className="flex items-center">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn shadow-none btn-square btn-ghost">
              {/* Sidebar toggle icon */}
              <GoSidebarExpand size={20} />
            </label>
            <div className="px-4 font-bold text-primary">Go Deliver</div>
          </div>

          <div className=" mr-3 md:mr-6">
            <ThemeToggle />
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4 ">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-star bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}

            <SidebarLink
              to={"/"}
              dataTip={"Homepage"}
              span={"HomePage"}
              Icon={GoHome}
            />
            <SidebarLink
              to={"/dashboard/my-parcels"}
              dataTip={"my Parcels"}
              span={"My parcels"}
              Icon={FaListUl}
            />
            <SidebarLink
              to={"/invoices"}
              dataTip={"Invoices"}
              span={"Invoices"}
              Icon={LiaFileInvoiceSolid}
            />
            <SidebarLink
              to={"/stores"}
              dataTip={"Stores"}
              span={"Stores"}
              Icon={LiaStoreSolid}
            />
            <SidebarLink
              to={"/coverage-area"}
              dataTip={"Coverage Area"}
              span={"Coverage Area"}
              Icon={LocateIcon}
            />
            <SidebarLink
              to={"/pricing-plan"}
              dataTip={"Pricing Plan"}
              span={"Pricing Plan"}
              Icon={FaRegMoneyBillAlt}
            />

            {/* List item */}

            <SidebarLink
              to={"/settings"}
              dataTip={"Settings"}
              span={"Settings"}
              Icon={IoSettingsOutline}
            />

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Change password">
                {/* Settings icon */}
                <PiPasswordDuotone size={20} />
                <span className="is-drawer-close:hidden">Password</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Help">
                {/* Settings icon */}
                <HelpCircle size={20} />
                <span className="is-drawer-close:hidden">Help</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Logout">
                {/* Settings icon */}
                <LogOut size={20} />
                <span className="is-drawer-close:hidden">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
