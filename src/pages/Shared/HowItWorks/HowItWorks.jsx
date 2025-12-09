import React, { useState, useEffect } from "react";
import { Truck, MapPin, CreditCard, Building } from "lucide-react";
import Container from "../../Responsive/Container";

const icons = {
  Truck,
  MapPin,
  CreditCard,
  Building,
};

export default function HowItWorks() {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetch("/howWorkSteps.json")
      .then((res) => res.json())
      .then((data) => setSteps(data))
      .catch((err) => console.error("Failed to load steps:", err));
  }, []);

  return (
    <section className="relative py-20 lg:py-24">
      <Container className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-black text-base-content mb-6">
            How <span className="text-primary">Go Deliver</span> Works
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-base-content/70">
            Sending parcels has never been easier. Follow these four simple
            steps for a seamless delivery experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = icons[step.icon];

            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100 + 200}
                className="group bg-base-100 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {Icon && <Icon className="w-10 h-10 text-primary" />}
                </div>

                <h3 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-base-content/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
