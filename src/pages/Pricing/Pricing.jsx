import React from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";
import Container from "../Responsive/Container";

const Pricing = () => {
  const { loading } = useAuth();
  const { isLoading } = useRole();

  if ((loading, isLoading)) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <Container>
        <h1 className="text-base-content">Pricing</h1>
      </Container>
    </div>
  );
};

export default Pricing;
