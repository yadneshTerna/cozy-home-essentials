import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Heart, Truck, Shield, RotateCcw, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import Breadcrumb from "@/components/Breadcrumb";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("Double");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 font-['DM_Sans']">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold text-stone-800 mb-4">Product Not Found</h1>
          <p className="text-stone-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button variant="hero">Browse Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Simulate multiple images using the same image
  const images = [product.image, product.image, product.image, product.image];
  
  const sizes = ["Single", "Double", "Queen", "King"];
  
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: product.category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "), href: `/products/${product.category}` },
    { label: product.name },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} (${selectedSize}) added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 font-['DM_Sans']">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mt-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-md">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-stone-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-stone-800" />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1.5 text-xs font-medium bg-emerald-700 text-stone-50 rounded-full">
                    New
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-3 py-1.5 text-xs font-medium bg-stone-800 text-stone-50 rounded-full">
                    Bestseller
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-3 py-1.5 text-xs font-medium bg-red-500 text-stone-50 rounded-full">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? "border-emerald-700 shadow-md"
                      : "border-transparent hover:border-stone-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                {product.material}
              </span>
              <span className="text-sm text-stone-500">
                {product.color}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-semibold text-stone-800 font-['Playfair_Display']">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-stone-800">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-stone-400 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-sm font-semibold text-red-500 bg-red-50 px-2 py-1 rounded">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-stone-600 leading-relaxed">
              Experience ultimate comfort with our {product.name.toLowerCase()}. 
              Made from premium {product.material.toLowerCase()} fabric, this piece brings 
              elegance and coziness to your home. Perfect for creating a warm, inviting 
              atmosphere in any room.
            </p>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-stone-800">Select Size</label>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-xl border-2 font-medium transition-all ${
                      selectedSize === size
                        ? "border-emerald-700 bg-emerald-50 text-emerald-700"
                        : "border-stone-200 text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border-2 border-stone-200 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-stone-600 hover:text-stone-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-stone-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-stone-600 hover:text-stone-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <Button
                variant="product"
                size="lg"
                className="flex-1 h-12"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>

              {/* Wishlist */}
              <button className="w-12 h-12 border-2 border-stone-200 rounded-xl flex items-center justify-center text-stone-600 hover:text-red-500 hover:border-red-200 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Stock Status */}
            <div className={`text-sm font-medium ${product.inStock ? "text-emerald-600" : "text-red-500"}`}>
              {product.inStock ? "✓ In Stock - Ready to Ship" : "✕ Currently Out of Stock"}
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-stone-100 rounded-full flex items-center justify-center mb-2">
                  <Truck className="w-5 h-5 text-stone-600" />
                </div>
                <p className="text-xs text-stone-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-stone-100 rounded-full flex items-center justify-center mb-2">
                  <RotateCcw className="w-5 h-5 text-stone-600" />
                </div>
                <p className="text-xs text-stone-600">30-Day Returns</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-stone-100 rounded-full flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5 text-stone-600" />
                </div>
                <p className="text-xs text-stone-600">2-Year Warranty</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 pt-6 border-t border-stone-200">
              <h3 className="text-lg font-semibold text-stone-800">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Material</span>
                  <span className="text-stone-800 font-medium">{product.material}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Color</span>
                  <span className="text-stone-800 font-medium">{product.color}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Size</span>
                  <span className="text-stone-800 font-medium">{product.size}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Category</span>
                  <span className="text-stone-800 font-medium capitalize">
                    {product.category.replace("-", " ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl lg:text-3xl font-semibold text-stone-800 font-['Playfair_Display'] mb-8">
              You May Also Like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-stone-100">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {relatedProduct.material}
                    </span>
                    <h3 className="text-base font-medium text-stone-800 mt-2 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-stone-800">
                        ${relatedProduct.price}
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-stone-500 line-through">
                          ${relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
