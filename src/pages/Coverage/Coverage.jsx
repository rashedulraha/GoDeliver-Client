import React from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";

const Coverage = () => {
  const { loading } = useAuth();
  const { isLoading } = useRole();

  if ((loading, isLoading)) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <h1>Coverage</h1>
    </div>
  );
};

export default Coverage;
