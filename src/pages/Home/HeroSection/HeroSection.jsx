import React from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  Package,
  Clock,
  Shield,
  ArrowRight,
  Star,
  CheckCircle,
  Users,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-base-100 to-accent/5">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
