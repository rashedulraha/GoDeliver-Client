import React from "react";
import { Link } from "react-router-dom";

const LoginNavLink = ({ to, label, Icon }) => {
  return (
    <Link
      to={`/${to}`}
      className="flex items-center gap-3 hover:bg-primary/20 hover:text-base-content transition-colors  py-2 px-2">
      {Icon && <Icon className="text-base-content" />}
      {label}
    </Link>
  );
};

export default LoginNavLink;
