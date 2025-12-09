import React, { useEffect, useState } from "react";
import { HelpCircle } from "lucide-react";
const FrequentlyAsked = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("/faq.json")
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch((err) => console.error("Failed to load FAQs:", err));
  }, []);

  return (
    <section className="relative py-20 lg:py-24 ">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-black text-base-content mb-6">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-base-content/70">
            Find answers to common questions about our services. Can't find what
            you're looking for? Feel free to contact our support team.
          </p>
        </div>

        {/* FAQ List */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.id}
              tabIndex={idx}
              className="collapse collapse-arrow bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition-all duration-300 rounded-md">
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={idx === 0}
              />
              <div className="collapse-title text-lg font-semibold flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-accent shrink-0" />
                {faq.question}
              </div>
              <div className="collapse-content text-base-content/80">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FrequentlyAsked;
