import React, { useEffect, useState } from "react";

const About = () => {
  const [tabData, setTabData] = useState({});
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    fetch("/about.json")
      .then((res) => res.json())
      .then((data) => {
        setTabData(data);
        setActiveTab(Object.keys(data)[0]);
      })
      .catch((err) => console.error("Failed to load About content:", err));
  }, []);

  const tabs = Object.keys(tabData);

  return (
    <section className="relative py-20 lg:py-24 bg-linear-to-br from-primary/5 via-base-100 to-accent/5">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-black text-base-content mb-6">
            About <span className="text-primary">Us</span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-base-content/70">
            Delivering excellence since our inception, we've grown to become a
            trusted name in logistics.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-primary text-base-content shadow-lg"
                  : "bg-base-100 text-base-content/70 hover:bg-base-200 hover:text-primary"
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="max-w-4xl mx-auto bg-base-100 rounded-2xl p-8 md:p-12 shadow-xl border border-base-300">
          <div className="space-y-4">
            {activeTab &&
              tabData[activeTab]?.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base-content/80 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 flex justify-center">
          <div className="h-1 w-24 bg-primary rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
