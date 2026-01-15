import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2.5 py-1 text-xs font-medium bg-emerald-700 text-stone-50 rounded-full">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2.5 py-1 text-xs font-medium bg-stone-800 text-stone-50 rounded-full">
              Bestseller
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-1 text-xs font-medium bg-red-500 text-stone-50 rounded-full">
              Sale
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-stone-50/60 flex items-center justify-center">
            <span className="px-4 py-2 bg-stone-800 text-stone-50 text-sm font-medium rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick View Button */}
        <div className="absolute inset-0 bg-stone-800/0 group-hover:bg-stone-800/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button variant="secondary" size="sm" className="gap-2 shadow-lg">
            <Eye className="w-4 h-4" />
            Quick View
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
            {product.material}
          </span>
          <span className="text-xs text-stone-500">
            {product.size}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-base font-medium text-stone-800 mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-semibold text-stone-800">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-stone-500 line-through">
              ${product.originalPrice}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-xs font-medium text-red-500">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button 
          variant="product" 
          className="w-full" 
          size="default"
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
