import React, { useRef, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  MapPin,
  DollarSign,
  Navigation,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const swiperRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: trackingSlides = [],
    isError,
    error,
  } = useQuery({
    queryKey: ["trackingSlides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trackingSlides");
      return res.data;
    },
  });

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error.message}
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-base-100 to-accent/5 py-20">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          data-aos="fade-down"
          data-aos-delay="300"
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div data-aos="fade-right" className="space-y-8">
            <div
              data-aos="zoom-in"
              data-aos-delay="200"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 text-primary font-bold">
              <Star className="w-5 h-5" /> Trusted by 10,000+ Businesses
            </div>

            <h1
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              Deliver <span className="text-primary">Anywhere</span> in
              Bangladesh <span className="block text-accent">Within Hours</span>
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="500"
              className="text-xl text-base-content/70 max-w-2xl">
              Go Deliver is your reliable partner for door-to-door parcel
              delivery across all 64 districts.
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="700"
              className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div
                  key={i}
                  data-aos="zoom-in"
                  data-aos-delay={800 + i * 100}
                  className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    {s.value}
                  </div>
                  <div className="text-base-content/60 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="1000"
              className="flex flex-wrap gap-4">
              <Link
                to="/dashboard/parcel/add"
                className="btn btn-primary btn-lg rounded-full px-10 group">
                Book Delivery Now
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition" />
              </Link>
              <Link
                to="/auth?type=register"
                className="btn btn-outline btn-lg rounded-full px-10">
                Become a Rider
              </Link>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="1200"
              className="grid grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  data-aos="fade-right"
                  data-aos-delay={1300 + i * 100}
                  className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  <span className="font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Swiper */}
          <div data-aos="fade-left" className="relative">
            {/* Navigation Buttons */}
            <div className="absolute top-6 right-6 z-50 flex gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-12 h-12 rounded-full bg-base-100 shadow-xl border border-base-300 flex items-center justify-center hover:scale-110 transition">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-12 h-12 rounded-full bg-base-100 shadow-xl border border-base-300 flex items-center justify-center hover:scale-110 transition">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute top-6 left-6 z-50 flex gap-2">
              {trackingSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  className={`transition-all duration-300 ${
                    activeSlide === i
                      ? "w-10 h-2 bg-primary rounded-full"
                      : "w-2 h-2 bg-base-content/40 rounded-full"
                  }`}
                />
              ))}
            </div>

            {/* Swiper Container */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-base-300">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                loop={true}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
                modules={[Autoplay, EffectFade]}
                onSlideChange={(s) => setActiveSlide(s.realIndex)}
                className="overflow-hidden!">
                {trackingSlides.map((slide) => {
                  const Icon = slide.icon || Truck;

                  const cardItems = [
                    {
                      Icon: Package,
                      label: "Parcel Type",
                    },
                    { Icon: DollarSign, label: "Cost", value: slide.price },
                    {
                      Icon: Clock,
                      label: "Delivery Time",
                    },
                    {
                      Icon: Navigation,
                      label: "Distance",
                    },
                  ];

                  return (
                    <SwiperSlide key={slide.id}>
                      <div className="p-8 lg:p-12 bg-base-100">
                        {/* Main Card */}
                        <div
                          className={`rounded-2xl p-8 bg-linear-to-r ${slide.color} text-base-content shadow-xl`}>
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h3 className="text-3xl font-bold">
                                {slide.title}
                              </h3>
                              <p className="mt-2 opacity-90">
                                Track ID: {slide.trackingId}
                              </p>
                            </div>
                            <Icon className="w-16 h-16 opacity-90" />
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                              <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> {slide.from}
                              </span>
                              <span className="flex items-center gap-2">
                                {slide.to} <MapPin className="w-4 h-4" />
                              </span>
                            </div>
                            <div className="h-4 bg-base-content/30 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-base-content rounded-full relative transition-all duration-1000"
                                style={{ width: `${slide.progress}%` }}>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-base-content rounded-full shadow-lg" />
                              </div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Picked</span>
                              <span
                                className={`px-4 py-1 rounded-full ${slide.statusColor} text-base-content`}>
                                {slide.status}
                              </span>
                              <span>Delivered</span>
                            </div>
                          </div>
                        </div>

                        {/* 4 Info Cards */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          {cardItems.map((item, i) => (
                            <div
                              key={i}
                              className="bg-base-200 rounded-2xl p-6 text-center shadow-lg">
                              <item.Icon
                                className={`w-12 h-12 mx-auto ${
                                  i < 2 ? "text-primary" : "text-accent"
                                }`}
                              />
                              <p className="mt-4 font-semibold text-base-content">
                                {item.label}
                              </p>
                              <p className="text-sm text-base-content/70">
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Rider Card */}
                        <div className="mt-8 bg-base-200 rounded-2xl p-6 shadow-lg flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center">
                              <figure className="rounded-full overflow-hidden border border-primary">
                                <img src={user.photoURL} alt="rashedul Islam" />
                              </figure>
                            </div>
                            <div>
                              <p className="font-bold text-base-content">
                                Rider: {slide.riderName}
                              </p>
                              <p className="text-sm text-base-content/70">
                                Verified & Active
                              </p>
                            </div>
                          </div>
                          <div className="text-base-content p-1 px-2 flex items-center gap-1 bg-accent rounded-sm">
                            <Shield className="w-4 h-4" /> Verified
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const stats = [
  { value: "24/7", label: "Service Available" },
  { value: "64", label: "Districts" },
  { value: "10K+", label: "Daily Orders" },
  { value: "98%", label: "On-time Delivery" },
];

const features = [
  "Real-time Tracking",
  "Door-to-Door",
  "Secure & Insured",
  "Digital POD",
  "Instant Booking",
  "24/7 Support",
];

export default HeroSection;
