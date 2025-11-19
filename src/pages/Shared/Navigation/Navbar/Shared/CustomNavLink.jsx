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
      <NavLink to={to && `/${to}`}>{label && label}</NavLink>
    </div>
  );
};

export default CustomNavLink;
