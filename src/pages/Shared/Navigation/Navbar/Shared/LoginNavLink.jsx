import React from "react";
import { Link } from "react-router-dom";

const LoginNavLink = ({ to, value, Icon }) => {
  return (
    <Link
      to={`/${to}`}
      className="flex items-center gap-3 hover:bg-accent/10 hover:text-base-100 transition-colors rounded-md py-1 px-2">
      {Icon && <Icon className="text-base-100" />}
      {value}
    </Link>
  );
};

export default LoginNavLink;
