import React from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaHome,
  FaArrowLeft,
  FaQuestionCircle,
} from "react-icons/fa";
import Container from "../Responsive/Container";

const NotFoundPage = () => {
  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center py-6 px-4">
        <div className="card  w-full max-w-4xl">
          <div className="card-body items-center text-center p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              {/* Left Column - Error Message */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mb-6">
                  <FaSearch className="w-12 h-12 text-warning" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-4 text-center">
                  Page Not Found
                </h1>

                <p className="text-base-content/70 mb-6 text-center max-w-md">
                  The page you are looking for might have been removed, had its
                  name changed, or is temporarily unavailable.
                </p>
              </div>

              {/* Right Column - Error Details */}
              <div className="flex-1 w-full">
                <div className="bg-base-200 rounded-lg p-6 border border-base-300 h-full">
                  <h2 className="text-xl font-semibold text-base-content mb-4 text-left">
                    Error Details
                  </h2>
                  <div className="space-y-4">
                    <div className="text-left">
                      <p className="text-sm font-medium text-base-content/70">
                        Error Code
                      </p>
                      <p className="font-mono text-warning font-bold text-lg">
                        404
                      </p>
                    </div>

                    <div className="text-left">
                      <p className="text-sm font-medium text-base-content/70">
                        Requested URL
                      </p>
                      <p className="font-mono text-base-content break-all text-sm">
                        {window.location.href}
                      </p>
                    </div>

                    <div className="text-left">
                      <p className="text-sm font-medium text-base-content/70">
                        Time
                      </p>
                      <p className="font-bold text-base-content">
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mt-8">
              <Link to="/" className="flex-1">
                <button className="btn bg-primary text-primary-content w-full hover:bg-primary/90">
                  <FaHome className="mr-2" />
                  Go to Homepage
                </button>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="btn btn-outline flex-1">
                <FaArrowLeft className="mr-2" />
                Go Back
              </button>
            </div>

            <div className="mt-8 text-sm text-base-content/50">
              <p className="flex items-center justify-center">
                Need help?{" "}
                <Link
                  to="/contact"
                  className="text-primary hover:underline flex items-center ml-1">
                  <FaQuestionCircle className="mr-1" />
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NotFoundPage;
