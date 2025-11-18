import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import HowItWorks from "../Shared/HowItWorks/HowItWorks";
import OurServices from "../Shared/OurServices/OurServices";
import Marque from "../Shared/Marque/Marque";
import Features from "../Shared/Features/Features";
import FrequentlyAsked from "../Shared/FrequentlyAsked/FrequentlyAsked";

const Home = () => {
  return (
    <div className="bg-primary text-base-100 pb-10">
      <HeroSection />
      <HowItWorks />
      <OurServices />
      <Marque />
      <Features />
      <FrequentlyAsked />
    </div>
  );
};

export default Home;
