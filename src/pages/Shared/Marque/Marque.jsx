import React from "react";
import Marquee from "react-fast-marquee";

// Import your brand logos
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";

const brands = [
  { name: "Moonstar", src: moonstar },
  { name: "Randstad", src: randstad },
  { name: "Star", src: star },
  { name: "Start People", src: start_people },
  { name: "Amazon", src: amazon },
  { name: "Casio", src: casio },
];

const BrandMarquee = () => {
  return (
    <section className="relative py-16 ">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-black text-base-content mb-6">
            Trusted by <span className="text-primary">Leading Brands</span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-base-content/70">
            We are proud to be the delivery partner for some of the most
            reputable companies in Bangladesh.
          </p>
        </div>

        <div className="overflow-hidden">
          <Marquee
            speed={40}
            pauseOnHover={true}
            gradient={true}
            gradientColor={[255, 255, 255]}
            gradientWidth={100}>
            {brands.map((brand, idx) => (
              <div key={idx} className="mx-12">
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="h-12 w-auto object-contain filter grayscale opacity-70 hover:filter-none hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
