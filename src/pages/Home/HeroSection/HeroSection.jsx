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

      <div className="relative container mx-auto px-4 py-10 md:py-15">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="space-y-8">
            <div
              data-aos="zoom-in"
              data-aos-delay="300"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
              <Star className="w-4 h-4" />
              <span>Trusted by 10,000+ Businesses</span>
            </div>

            <h1
              data-aos="fade-up"
              data-aos-delay="400"
              className="text-4xl md:text-6xl font-bold text-base-content leading-tight">
              Deliver <span className="text-primary">Anywhere</span> in
              Bangladesh
              <span className="block text-accent">Within Hours</span>
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="500"
              className="text-xl text-base-400 max-w-2xl">
              Go Deliver is your reliable partner for door-to-door parcel
              delivery. Book, track, and manage deliveries seamlessly across all
              64 districts.
            </p>

            {/* Stats */}
            <div
              data-aos="fade-up"
              data-aos-delay="600"
              className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={700 + index * 100}
                  className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-base-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              data-aos="fade-up"
              data-aos-delay="1100"
              className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard/parcel/add"
                className="btn btn-primary btn-lg rounded-full px-8 group"
                data-aos="zoom-in"
                data-aos-delay="1200">
                <span>Book Delivery Now</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/auth?type=register"
                className="btn btn-outline btn-lg rounded-full px-8 border-2"
                data-aos="zoom-in"
                data-aos-delay="1300">
                Become a Rider
              </Link>
            </div>

            {/* Features List */}
            <div
              data-aos="fade-up"
              data-aos-delay="1400"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  data-aos="fade-right"
                  data-aos-delay={1500 + index * 100}
                  className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-base-content">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const stats = [
  { value: "24/7", label: "Service Available" },
  { value: "64", label: "Districts Covered" },
  { value: "10K+", label: "Deliveries" },
  { value: "98%", label: "Satisfaction" },
];

const features = [
  "Real-time Tracking",
  "Door-to-Door Service",
  "Secure Delivery",
  "Digital Proof",
  "Instant Booking",
  "24/7 Support",
];

export default HeroSection;
