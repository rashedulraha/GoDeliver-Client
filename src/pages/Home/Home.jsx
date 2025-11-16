import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import HowItWorks from "../Shared/HowItWorks/HowItWorks";
import OurServices from "../Shared/OurServices/OurServices";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <OurServices />
    </div>
  );
};

export default Home;
