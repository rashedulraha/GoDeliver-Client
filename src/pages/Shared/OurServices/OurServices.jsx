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
      </div>
    </section>
  );
};

export default OurServices;
