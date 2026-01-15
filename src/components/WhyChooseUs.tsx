import { Sparkles, WashingMachine, Truck, BadgePercent } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Premium Fabric",
    description: "100% organic cotton and linen sourced from the finest mills",
  },
  {
    icon: WashingMachine,
    title: "Easy Wash & Care",
    description: "Machine washable fabrics that stay soft wash after wash",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping on orders over $75 with 3-5 day delivery",
  },
  {
    icon: BadgePercent,
    title: "Affordable Pricing",
    description: "Luxury quality at prices that won't break the bank",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-stone-50">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-800 mb-4">
            Why Choose Nestora
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            We believe everyone deserves comfort without compromise
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mb-5 transition-all duration-300 group-hover:bg-emerald-700 group-hover:text-stone-50">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
