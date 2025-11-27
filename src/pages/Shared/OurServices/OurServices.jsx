import {
  TruckIcon,
  MapIcon,
  HomeIcon,
  BuildingOfficeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Container from "../../Responsive/Container";

const services = [
  {
    title: "Express & Standard Delivery",
    desc: "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
    icon: TruckIcon,
  },
  {
    title: "Nationwide Delivery",
    desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
    icon: MapIcon,

    highlighted: true,
  },
  {
    title: "Fulfilment Solution",
    desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: BuildingOfficeIcon,
  },
  {
    title: "Cash on Home Delivery",
    desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: HomeIcon,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    desc: "Customized corporate services which includes warehouse and inventory management support.",
    icon: BuildingOfficeIcon,
  },
  {
    title: "Parcel Return",
    desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: ArrowPathIcon,
  },
];

export default function OurServices() {
  return (
    <section className="py-16 ">
      <Container>
        {/* Section Title & Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-sm md:text-base  max-w-3xl mx-auto">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className={`${service.bg} p-6 rounded-md border  transition-shadow flex flex-col items-center text-center space-y-4 `}>
                {/* Icon Circle */}
                <div className="w-16 h-16  flex items-center justify-center">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-lg md:text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="text-sm ">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
