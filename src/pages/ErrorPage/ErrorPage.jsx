import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";
import Container from "../Responsive/Container";

const ErrorPage = () => {
  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center py-6 px-4">
        <div className="card w-full max-w-4xl">
          <div className="card-body items-center text-center p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              {/* Left Column - Error Message */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mb-6">
                  <FaExclamationTriangle className="w-12 h-12 text-error" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-4 text-center">
                  Oops! Something went wrong
                </h1>

                <p className="text-base-content/70 mb-6 text-center max-w-md">
                  We're sorry, but an unexpected error has occurred. Our team
                  has been notified.
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
                      <p className="font-mono text-error font-bold text-lg">
                        500
                      </p>
                    </div>

                    <div className="text-left">
                      <p className="text-sm font-medium text-base-content/70">
                        Error Type
                      </p>
                      <p className="font-bold text-base-content">
                        Internal Server Error
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
                onClick={() => window.location.reload()}
                className="btn btn-outline flex-1">
                <FaRedo className="mr-2" />
                Try Again
              </button>
            </div>

            <div className="mt-8 text-sm text-base-content/50">
              <p>If this problem persists, please contact our support team.</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ErrorPage;
