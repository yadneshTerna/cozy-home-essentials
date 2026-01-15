import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bedroom.jpg";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxurious bedroom with premium bedding"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50/80 via-stone-50/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-xl animate-[fadeUp_0.6s_ease-out_forwards]">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-emerald-100 text-emerald-700 rounded-full">
            New Collection 2024
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-stone-800 leading-tight mb-6">
            Comfort That Feels Like Home
          </h1>
          <p className="text-lg md:text-xl text-stone-500 mb-8 max-w-md">
            Premium fabrics crafted for lasting comfort. Experience the luxury of everyday living with our curated home essentials.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="xl">
              Shop Collection
            </Button>
            <Button variant="hero-outline" size="xl">
              Explore More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
