import React, { useState } from "react";

const About = () => {
  const [activeTab, setActiveTab] = useState("Story");

  const tabs = ["Story", "Mission", "Success", "Team & Others"];

  const content = {
    Story: [
      "Our journey began with a simple promise: to make delivery fast, reliable, and stress-free. What started as a small operation has grown into a trusted partner for thousands of customers who depend on us for their critical shipments.",
      "Through innovation and dedication, we've developed cutting-edge logistics solutions that include real-time tracking, optimized routing, and a network of professional couriers committed to excellence.",
      "Whether it's a personal package or a business-critical delivery, we ensure every item reaches its destination on time, every time. Our commitment to quality service remains the cornerstone of our company culture.",
    ],
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl text-base-content/50 max-w-2xl mx-auto">
            Delivering excellence since our inception, we've grown to become a
            trusted name in logistics.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-base-300">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm md:text-base transition-colors ${
                activeTab === tab ? "active" : "hover:text-primary"
              }`}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="bg-base-200 rounded-lg p-6 md:p-8 shadow-md">
          {activeTab === "Story" && (
            <div className="space-y-4">
              {content.Story.map((paragraph, index) => (
                <p key={index} className="text-base-content/50 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== "Story" && (
            <div className="text-center py-8">
              <p className="text-base-content/50">
                Content for {activeTab} section will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Additional decorative element */}
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-24 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
