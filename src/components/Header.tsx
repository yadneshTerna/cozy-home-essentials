import { ShoppingBag, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-stone-50/95 backdrop-blur supports-[backdrop-filter]:bg-stone-50/80 border-b border-stone-200">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-semibold text-stone-800">
            Nestora
          </span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/products/bedsheets" className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors">
            Bedsheets
          </Link>
          <Link to="/products/pillow-covers" className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors">
            Pillow Covers
          </Link>
          <Link to="/products/sofa-covers" className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors">
            Sofa Covers
          </Link>
          <Link to="/products" className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors">
            All Products
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-700 text-[10px] font-medium text-stone-50 flex items-center justify-center">
              2
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
