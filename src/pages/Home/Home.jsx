import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import HowItWorks from "../Shared/HowItWorks/HowItWorks";
import OurServices from "../Shared/OurServices/OurServices";
import Marque from "../Shared/Marque/Marque";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <OurServices />
      <Marque />
    </div>
  );
};

export default Home;
