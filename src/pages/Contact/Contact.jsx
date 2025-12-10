import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Container from "../Responsive/Container";
import { Link } from "react-router-dom";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
    reset(); // Clear the form
    setTimeout(() => setIsSubmitted(false), 5000); // Hide success message after 5 seconds
  };

  return (
    <section className="relative py-20 lg:py-24 bg-linear-to-br from-primary/5 via-base-100 to-accent/5">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-black text-base-content mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-base-content/70">
            We're here to help and answer any question you might have. We look
            forward to hearing from you.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div
            data-aos="fade-right"
            data-aos-delay="200"
            className="lg:col-span-2">
            <div className="bg-base-100 rounded-md p-8 md:p-12 border border-base-300">
              <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-3">
                <MessageCircle className="w-7 h-7 text-primary" />
                Send us a Message
              </h2>

              {isSubmitted && (
                <div className="alert alert-success shadow-lg mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Your message has been sent successfully!</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Rashedul Islam"
                      className="w-full input input-md rounded-md border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50  shadow-none "
                      {...register("name", { required: "Name is required" })}
                    />{" "}
                    shadow-none
                    {errors.name && (
                      <p className="text-error text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      placeholder="rashedul@example.com"
                      className="w-full input input-md rounded-md border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-none"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered value does not match email format",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-error text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full input input-md rounded-md border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-none"
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                  />
                  {errors.subject && (
                    <p className="text-error text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Your message here..."
                    className="w-full input input-md rounded-md border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none shadow-none"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  {errors.message && (
                    <p className="text-error text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-md shadow-none  rounded-full px-10 group">
                  Send Message
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div data-aos="fade-left" data-aos-delay="300" className="space-y-8">
            {/* Info Card */}
            <div className="bg-base-100 rounded-md p-8 shadow-xl border border-base-300">
              <h3 className="text-2xl font-bold text-base-content mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-base-content/70">
                      123 Main Road, Dhanmondi, <br />
                      Dhaka-1205, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-base-content/70">+880 1234-567890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-base-content/70">
                      support@godeliver.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-base-content/70">
                      Mon - Sat: 9:00 AM - 8:00 PM
                    </p>
                    <p className="text-base-content/70">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-accent/10 rounded-md p-8 text-center border border-accent/30">
              <h3 className="text-xl font-bold text-base-content mb-4">
                Follow Us
              </h3>
              <div className="flex justify-center gap-4">
                <Link
                  to={"/"}
                  className="w-12 h-12 rounded-full bg-primary/10 border border-primary flex items-center justify-center hover:bg-primary hover:text-base-content transition-all duration-300 shadow-md">
                  <FaXTwitter className="w-5 h-5" />
                </Link>
                <Link
                  to={"/"}
                  className="w-12 h-12 rounded-full bg-primary/10 border border-primary flex items-center justify-center hover:bg-primary hover:text-base-content transition-all duration-300 shadow-md">
                  <FaFacebook className="w-5 h-5" />
                </Link>
                <Link
                  to={"/"}
                  className="w-12 h-12 rounded-full bg-primary/10 border border-primary flex items-center justify-center hover:bg-primary hover:text-base-content transition-all duration-300 shadow-md">
                  <FaInstagram className="w-5 h-5" />
                </Link>
                <Link
                  to={"/"}
                  className="w-12 h-12 rounded-full bg-primary/10 border border-primary flex items-center justify-center hover:bg-primary hover:text-base-content transition-all duration-300 shadow-md">
                  <FaYoutube className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
