import React from "react";
import { Link } from "react-router-dom";

const AccountSideLink = ({ to, label, Icon }) => {
  return (
    <Link
      to={`${to}`}
      className="btn w-full btn-sm border-none outline-none shadow-none bg-primary capitalize rounded-sm">
      {Icon && <Icon className="text-base-content size-4" />}
      {label}
    </Link>
  );
};

export default AccountSideLink;
