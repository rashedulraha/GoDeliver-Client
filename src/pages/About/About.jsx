import React, { useEffect, useState } from "react";

const About = () => {
  const [tabData, setTabData] = useState({});
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    fetch("/about.json")
      .then((res) => res.json())
      .then((data) => {
        setTabData(data);
        setActiveTab(Object.keys(data)[0]); // set first tab as active
      })
      .catch((err) => console.error("Failed to load About content:", err));
  }, []);

  const tabs = Object.keys(tabData);

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
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "hover:text-primary"
              }`}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="bg-base-200 rounded-lg p-6 md:p-8 shadow-md">
          <div className="space-y-4">
            {activeTab &&
              tabData[activeTab]?.map((paragraph, index) => (
                <p key={index} className="text-base-content/50 leading-relaxed">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-24 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
