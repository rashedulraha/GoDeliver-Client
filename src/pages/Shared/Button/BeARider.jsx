import React from "react";
import { Link } from "react-router-dom";

const BeARider = ({ to, value, className }) => {
  return (
    <>
      <Link
        to={`/${to}`}
        className={`btn btn-md shadow-none border-none  ${className}`}>
        {value}
      </Link>
    </>
  );
};

export default BeARider;
