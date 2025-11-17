import React from "react";
import Container from "../../Responsive/Container";

const HeroSection = () => {
  return (
    <Container>
      <div className="hero  min-h-screen ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-primary">Go Deliver</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn ">Get Started</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
