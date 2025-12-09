import React, { useEffect, useState } from "react";
import { MapPin, Shield, Headphones } from "lucide-react";

// Map string icon names to React components
const icons = { MapPin, Shield, Headphones };

const Features = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("/features.json")
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch((err) => console.error("Failed to load features:", err));
  }, []);

  return (
    <section className="relative py-20 lg:py-24">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-4xl md:text-5xl font-black text-base-content mb-6"
            data-aos="fade-up">
            Why Choose <span className="text-primary">Go Deliver</span>
          </h2>
          <p
            className="text-lg text-base-content/70"
            data-aos="fade-up"
            data-aos-delay="100">
            We combine cutting-edge technology with a dedicated team to provide
            a delivery experience you can trust.
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-12">
          {features.map((feature, idx) => {
            const Icon = icons[feature.icon];
            const isEven = feature.id % 2 === 0;

            return (
              <div
                key={feature.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100 + 200}
                className={`flex flex-col items-center gap-8 lg:flex-row ${
                  isEven ? "lg:flex-row-reverse" : ""
                } bg-base-100 border border-base-100 p-8 lg:p-12 rounded-lg transition-all duration-300`}>
                {/* Icon */}
                <div className="w-full lg:w-1/3 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    {Icon && <Icon className="w-16 h-16 text-primary" />}
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-2/3 text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-base-content mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-base-content/70 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
