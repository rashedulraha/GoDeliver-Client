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

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Import required modules
import { Autoplay, Navigation as SwiperNav, EffectFade } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  const { data: trackingSlides = [] } = useQuery({
    queryKey: ["trackingSlides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trackingSlides");
      return res.data;
    },
  });

  const nextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

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
          {/* Left Content (Unchanged) */}
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

          {/* Right Content - Swiper Slider */}
          <div
            data-aos="fade-left"
            data-aos-duration="1200"
            data-aos-delay="300"
            className="relative">
            {/* Slider Navigation Buttons */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-base-100/80 backdrop-blur-sm flex items-center justify-center hover:bg-base-200 transition-colors shadow-lg"
                aria-label="Previous slide">
                <ChevronLeft className="w-5 h-5 text-base-content" />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-base-100/80 backdrop-blur-sm flex items-center justify-center hover:bg-base-200 transition-colors shadow-lg"
                aria-label="Next slide">
                <ChevronRight className="w-5 h-5 text-base-content" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              {trackingSlides?.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "bg-primary w-4" : "bg-base-400/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Swiper Container */}
            <div className="relative bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-300 pt-12">
              <Swiper
                ref={swiperRef}
                spaceBetween={30}
                effect="fade"
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Autoplay, EffectFade]}
                onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                className="tracking-slider">
                {trackingSlides.map((slide) => {
                  const Icon = slide.icon;
                  return (
                    <SwiperSlide key={slide.id}>
                      <div className="p-6">
                        {/* Tracking Card */}
                        <div
                          data-aos="zoom-in"
                          data-aos-delay="500"
                          className={`bg-linear-to-r ${slide.color} rounded-2xl p-6 text-base-content mb-6`}>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold">
                                {slide.title}
                              </h3>
                              <p className="text-primary-content/80">
                                Track ID: {slide.trackingId}
                              </p>
                            </div>
                            <Icon className="w-10 h-10" />
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{slide.from}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>{slide.to}</span>
                                <MapPin className="w-4 h-4" />
                              </div>
                            </div>
                            <div className="h-2 bg-base-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-base-content rounded-full relative transition-all duration-1000"
                                style={{ width: `${slide.progress}%` }}>
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-base-content rounded-full"></div>
                              </div>
                            </div>
                            <div className="flex justify-between text-xs mt-2">
                              <span>Picked</span>
                              <span
                                className={`px-2 py-0.5 rounded-full ${slide.statusColor} text-base-content`}>
                                {slide.status}
                              </span>
                              <span>Delivered</span>
                            </div>
                          </div>
                        </div>

                        {/* Parcel Info Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div
                            data-aos="flip-left"
                            data-aos-delay="600"
                            className="card bg-base-200">
                            <div className="card-body p-4">
                              <div className="flex items-center gap-3">
                                <Package className="w-8 h-8 text-primary" />
                                <div>
                                  <div className="font-semibold">
                                    Parcel Type
                                  </div>
                                  <div className="text-sm text-base-400">
                                    {slide.parcelType}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            data-aos="flip-right"
                            data-aos-delay="700"
                            className="card bg-base-200">
                            <div className="card-body p-4">
                              <div className="flex items-center gap-3">
                                <DollarSign className="w-8 h-8 text-accent" />
                                <div>
                                  <div className="font-semibold">Cost</div>
                                  <div className="text-sm text-base-400">
                                    {slide.price}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Time and Rider Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div
                            data-aos="flip-left"
                            data-aos-delay="800"
                            className="card bg-base-200">
                            <div className="card-body p-4">
                              <div className="flex items-center gap-3">
                                <Clock className="w-8 h-8 text-accent" />
                                <div>
                                  <div className="font-semibold">
                                    Delivery Time
                                  </div>
                                  <div className="text-sm text-base-400">
                                    {slide.deliveryTime}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            data-aos="flip-right"
                            data-aos-delay="900"
                            className="card bg-base-200">
                            <div className="card-body p-4">
                              <div className="flex items-center gap-3">
                                <Navigation className="w-8 h-8 text-primary" />
                                <div>
                                  <div className="font-semibold">Distance</div>
                                  <div className="text-sm text-base-400">
                                    {slide.riderDistance}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Rider Info */}
                        <div
                          data-aos="zoom-in-up"
                          data-aos-delay="1000"
                          className="card bg-base-200">
                          <div className="card-body p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent text-primary-content flex items-center justify-center">
                                    <Users className="w-6 h-6" />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-semibold">
                                    Rider Assigned
                                  </div>
                                  <div className="text-sm text-base-400">
                                    {slide.riderName}
                                  </div>
                                </div>
                              </div>
                              <div className="badge badge-accent gap-1">
                                <Shield className="w-3 h-3" />
                                Verified
                              </div>
                            </div>
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
