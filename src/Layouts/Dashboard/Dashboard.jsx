import React from "react";
import { Link, Outlet } from "react-router-dom";
import ThemeToggle from "../../Components/Theme/ToggleTheme";
import { GoHome, GoSidebarExpand } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
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
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage">
                {/* Home icon */}
                <GoHome size={20} />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings">
                {/* Settings icon */}
                <IoSettingsOutline size={20} />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
