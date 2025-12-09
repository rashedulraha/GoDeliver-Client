import React, { useEffect, useState } from "react";
import { Truck, MapPin, Home, Building, ArrowLeft } from "lucide-react";

const icons = { Truck, MapPin, Home, Building, ArrowLeft };

const OurServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Failed to load services:", err));
  }, []);

  return (
    <section className="relative py-20 lg:py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-base-content mb-6">
            Our <span className="text-accent">Services</span>
          </h2>
          <p className="text-lg text-base-content/70">
            Enjoy fast, reliable parcel delivery with real-time tracking. From
            personal packages to business shipments — we deliver on time, every
            time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = icons[service.icon]; // map string to component

            return (
              <div
                key={idx}
                className={`group p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 border-2 ${
                  service.highlighted
                    ? "bg-accent/10 border-accent shadow-xl"
                    : "bg-base-100 border-base-300 shadow-lg hover:shadow-2xl"
                }`}>
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                    service.highlighted
                      ? "bg-linear-to-br from-accent/20 to-primary/20"
                      : "bg-linear-to-br from-primary/10 to-accent/10"
                  }`}>
                  <Icon
                    className={`w-10 h-10 ${
                      service.highlighted ? "text-accent" : "text-primary"
                    }`}
                  />
                </div>

                <h3
                  className={`text-xl font-bold mb-3 transition-colors ${
                    service.highlighted
                      ? "text-accent"
                      : "text-base-content group-hover:text-primary"
                  }`}>
                  {service.title}
                </h3>

                <p className="text-sm text-base-content/70 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
