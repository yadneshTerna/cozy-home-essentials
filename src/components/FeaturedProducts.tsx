import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  {
    id: 1,
    name: "Classic Cotton Bedsheet Set",
    price: 89,
    originalPrice: 120,
    image: product1,
    category: "Bedsheets",
  },
  {
    id: 2,
    name: "Linen Pillow Cover Duo",
    price: 45,
    image: product2,
    category: "Pillow Covers",
  },
  {
    id: 3,
    name: "Premium Sofa Slipcover",
    price: 149,
    originalPrice: 189,
    image: product3,
    category: "Sofa Covers",
  },
  {
    id: 4,
    name: "Luxury Duvet Cover Set",
    price: 129,
    image: product4,
    category: "Bedsheets",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-stone-100/50">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-800 mb-4">
              Featured Products
            </h2>
            <p className="text-stone-500 max-w-md">
              Our most loved pieces, handpicked for quality and comfort
            </p>
          </div>
          <Link to="/products" className="mt-4 md:mt-0 text-emerald-700 font-medium hover:underline underline-offset-4">
            View All Products →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                  {product.category}
                </span>
                <h3 className="text-base font-medium text-stone-800 mt-1 mb-3 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-semibold text-stone-800">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <Button variant="product" className="w-full" size="default">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
