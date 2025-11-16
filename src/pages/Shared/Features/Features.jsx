import React from "react";
import Container from "../../Responsive/Container";

const Features = () => {
  return (
    <Container>
      <div className=" space-y-8 p-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 p-8 rounded-md border">
          <div className="w-full lg:w-1/3 flex justify-center">
            <img alt="Tracking Illustration" className="max-w-[220px] w-full" />
          </div>

          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-3">
              Live Parcel Tracking
            </h2>
            <p className="text-base leading-relaxed">
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment’s journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 p-8 rounded-md border">
          <div className="w-full lg:w-1/3 flex justify-center">
            <img alt="Delivery Illustration" className="max-w-[220px] w-full" />
          </div>

          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-3">100% Safe Delivery</h2>
            <p className="text-base leading-relaxed">
              We ensure your parcels are handled with the utmost care and
              delivered securely to their destination. Our reliable process
              guarantees safe and damage-free delivery every time.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 p-8 rounded-md border">
          <div className="w-full lg:w-1/3 flex justify-center">
            <img alt="Support Illustration" className="max-w-[220px] w-full" />
          </div>

          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-3">
              24/7 Call Center Support
            </h2>
            <p className="text-base leading-relaxed">
              Our dedicated support team is available around the clock to assist
              you with any questions, updates, or delivery concerns—anytime you
              need us.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Features;
