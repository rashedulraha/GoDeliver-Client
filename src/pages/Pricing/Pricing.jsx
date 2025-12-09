import React, { useEffect, useState } from "react";
import { Check, X, Star, ArrowRight } from "lucide-react";
import FrequentlyAsked from "../Shared/FrequentlyAsked/FrequentlyAsked";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // Fetch pricing plans
    fetch("/pricing.json")
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error("Failed to load pricing plans:", err));
  }, []);

  return (
    <section className="relative py-20 lg:py-24 bg-linear-to-br from-primary/5 via-base-100 to-accent/5">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-black text-base-content mb-6">
            Simple, <span className="text-accent">Transparent</span> Pricing
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-base-content/70">
            Choose the perfect plan for your delivery needs. No hidden fees,
            just reliable service.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, idx) => (
            <div
              key={plan.id}
              data-aos="fade-up"
              data-aos-delay={idx * 100 + 200}
              className={`relative bg-base-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 flex flex-col ${
                plan.popular ? "border-accent" : "border-transparent"
              }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-base-content text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> MOST POPULAR
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-center text-base-content mb-2">
                  {plan.name}
                </h3>
                <p className="text-center text-base-content/70 mb-6">
                  {plan.description}
                </p>
              </div>
              <div className="flex-1">
                <div className="text-center text-4xl font-black text-primary mb-8">
                  {plan.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-success shrink-0" />
                      <span className="text-base-content/80">{feature}</span>
                    </li>
                  ))}
                  {plan.excluded.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 opacity-60">
                      <X className="w-5 h-5 text-error shrink-0" />
                      <span className="text-base-content/50 line-through">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={"/"}
                className={`btn w-full rounded-full shadow-none ${
                  plan.popular ? "btn-accent" : "btn-primary"
                }`}>
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <FrequentlyAsked />
      </div>
    </section>
  );
};

export default PricingPage;
