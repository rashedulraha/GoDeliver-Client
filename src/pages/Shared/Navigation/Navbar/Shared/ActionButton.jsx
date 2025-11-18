import React from "react";
import { Link } from "react-router-dom";

const ActionButton = ({ to, value, className }) => {
  return (
    <>
      <Link
        to={`/${to}`}
        className={`btn btn-sm shadow-none border-none  ${className}`}>
        {value}
      </Link>
    </>
  );
};

export default ActionButton;
