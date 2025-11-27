import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const CustomNavLink = ({ to, label, color }) => {
  const [, setOpen] = useState(false);

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
        className={`${color} text-base-content/50 hover:border-b transition-all hover:border-b-primary pb-2 `}
        to={to && `/${to}`}>
        {label && label}
      </NavLink>
    </div>
  );
};

export default CustomNavLink;
