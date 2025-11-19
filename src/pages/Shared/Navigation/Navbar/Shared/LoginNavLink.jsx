import React from "react";
import { Link } from "react-router-dom";

const LoginNavLink = ({ to, label, Icon }) => {
  return (
    <Link
      to={`/${to}`}
      className="flex items-center gap-3 hover:bg-accent/20 hover:text-base-100 transition-colors  py-1 px-2">
      {Icon && <Icon className="text-base-100" />}
      {label}
    </Link>
  );
};

export default LoginNavLink;
