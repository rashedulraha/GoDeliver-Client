import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../pages/Shared/Loading/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { loading, logoutUser } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  if (role !== "admin") {
    return logoutUser();
  }
  return children;
};

export default AdminRoute;
