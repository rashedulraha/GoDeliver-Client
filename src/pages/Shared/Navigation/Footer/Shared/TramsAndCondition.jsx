import React from "react";
import { Link } from "react-router-dom";

const TramsAndCondition = ({ to, value }) => {
  return (
    <>
      <Link
        to={`/${to}`}
        className="text-base-content/80 hover:text-accent transition-colors text-sm">
        {value}
      </Link>
    </>
  );
};

export default TramsAndCondition;
