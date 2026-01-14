import { Link } from "react-router-dom";
import categoryBedsheets from "@/assets/category-bedsheets.jpg";
import categoryPillows from "@/assets/category-pillows.jpg";
import categorySofa from "@/assets/category-sofa.jpg";

const categories = [
  {
    title: "Bedsheets",
    description: "Soft, breathable cotton sheets for restful nights",
    image: categoryBedsheets,
    href: "/products/bedsheets",
  },
  {
    title: "Pillow Covers",
    description: "Elegant designs for every bedroom style",
    image: categoryPillows,
    href: "/products/pillow-covers",
  },
  {
    title: "Sofa Covers",
    description: "Protect and refresh your living space",
    image: categorySofa,
    href: "/products/sofa-covers",
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Find the perfect pieces to transform your home into a cozy sanctuary
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={category.href}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-hover transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                <h3 className="text-2xl font-display font-semibold mb-2">
                  {category.title}
                </h3>
                <p className="text-cream/80 text-sm">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
