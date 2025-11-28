import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRoute = ({ children }) => {
  const { user } = useAuth();

  const location = useLocation();

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"} />;
};

export default PrivetRoute;
