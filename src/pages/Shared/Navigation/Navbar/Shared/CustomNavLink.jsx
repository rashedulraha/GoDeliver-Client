import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const CustomNavLink = ({ to, label, dropdown }) => {
  const [open, setOpen] = useState(false);

  const handleEnter = () => {
    setOpen(true);
  };
  const handleLeave = () => {
    setOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}>
      <NavLink
        to={to && `/${to}`}
        className="hover:text-accent transition-all  py-4">
        {label && label}
      </NavLink>

      {/* Dropdown Menu */}

      {dropdown && open && (
        <div className="absolute left-0 w-64 pt-5 z-50 ">
          <div className="bg-accent/10 backdrop-blur-xl">
            {dropdown.map((item, index) => (
              <Link
                key={index}
                to={`/${item.to}`}
                className="block px-3 py-2  hover:bg-accent/20 transition-all ">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomNavLink;
