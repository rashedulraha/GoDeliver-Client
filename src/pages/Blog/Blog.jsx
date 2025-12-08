import React from "react";
import useRole from "../../Hooks/useRole";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";
import Container from "../Responsive/Container";

const Blog = () => {
  const { loading } = useAuth();
  const { isLoading } = useRole();

  if ((loading, isLoading)) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <Container>
        <h1>Blog</h1>
      </Container>
    </div>
  );
};

export default Blog;
