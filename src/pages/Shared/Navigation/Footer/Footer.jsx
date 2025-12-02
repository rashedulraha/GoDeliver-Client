import { Link } from "react-router-dom";
import Container from "../../../Responsive/Container";
import { TbTruckDelivery } from "react-icons/tb";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

import AppDownload from "./Shared/AppDownload";
import TramsAndCondition from "./Shared/TramsAndCondition";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content   border-t border-base-200 ">
      <Container>
        {/* main Footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10 px-0 text-base-content">
          {/* company Info */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-2xl mb-4">
              <TbTruckDelivery size={34} />
              <span>Go Deliver</span>
            </Link>
            <p className="text-base-content/50 max-w-xs">
              Your trusted delivery partner, bringing packages to your doorstep
              with speed and reliability.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href=""
                className="text-base-content/80 hover:text-accent transition-colors">
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-base-content/80 hover:text-accent transition-colors">
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-base-content/80 hover:text-accent transition-colors">
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-base-content/80 hover:text-accent transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 md:text-center ">
              Quick Links
            </h3>
            <ul className="space-y-2 md:text-center">
              {["Service", "Coverage", "About", "Pricing"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="text-base-content/50 hover:text-accent transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + App Download */}
          <div>
            <h3 className="font-bold text-lg mb-4">Subscribe</h3>
            <p className="text-base-content/50 mb-4">
              Get our latest updates and offers directly in your inbox.
            </p>
            <form className="flex flex-col  gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-sm text-primary outline   w-full sm:w-auto flex-1 bg-base-100 input-md"
              />

              <button className="bg-primary/70 text-base-content btn btn-md shadow-none border-none rounded-sm hover:bg-primary transition-colors cursor-pointer">
                Subscribe
              </button>
            </form>

            {/* App Download Buttons */}
            <div className="mt-6 flex gap-2">
              <AppDownload
                to={"https://play.google.com/store/games?hl=en"}
                value={" Google Play"}
              />
              <AppDownload
                to={"https://www.apple.com/lae/app-store/"}
                value={"Apple Store"}
              />
            </div>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 ">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1" size={16} />
                <span className="text-base-content/50">
                  123 Naogaon Street, City, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone size={16} />
                <span className="text-base-content/50">01992-284845</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope size={16} />
                <span className="text-base-content/50">info@godeliver.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-accent py-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base-content/80 text-sm">
            © {currentYear} Go Deliver. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <TramsAndCondition to={"privacy"} value={"Privacy Policy"} />
            <TramsAndCondition to={"terms"} value={" Terms of Service"} />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
