import React from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";
import Container from "../Responsive/Container";

const Contact = () => {
  const { loading } = useAuth();
  const { isLoading } = useRole();

  if ((loading, isLoading)) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <Container>
        <h1>Contact</h1>
      </Container>
    </div>
  );
};

export default Contact;
