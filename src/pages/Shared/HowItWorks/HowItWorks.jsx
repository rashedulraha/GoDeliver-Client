// src/components/HowItWorks.jsx
import { TruckIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Container from "../../Responsive/Container";

const steps = [
  {
    icon: TruckIcon,
    title: "Booking Pick & Drop",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: TruckIcon,
    title: "Cash On Delivery",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: MapPinIcon,
    title: "Delivery Hub",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: TruckIcon,
    title: "Booking SME & Corporate",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-12 ">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="card  cursor-pointer p-6 flex flex-col items-center text-center border rounded-md ">
                <div className="mb-5">
                  <Icon className="h-12 w-12 " />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold  mb-3">{step.title}</h3>

                {/* Description */}
                <p className="text-sm  leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
