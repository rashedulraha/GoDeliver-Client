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
      <NavLink to={`/${to}`} className="hover:text-accent transition-colors">
        {label}
      </NavLink>

      {/* Dropdown Menu */}

      {dropdown && open && (
        <div className="absolute left-0 pt-5 pb-2 w-64 bg-accent/10 text-base-100  rounded-sm  z-20 space-y-3 backdrop-blur-2xl">
          {dropdown.map((item, index) => (
            <Link
              key={index}
              to={`/${item.to}`}
              className="block px-3 p-1  hover:bg-accent/20 transition-all ">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomNavLink;
