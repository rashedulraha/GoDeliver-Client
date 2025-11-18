import React from "react";
import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, value }) => {
  return (
    <NavLink to={`/${to}`} className="hover:text-accent transition-colors">
      {value}
    </NavLink>
  );
};

export default CustomNavLink;
