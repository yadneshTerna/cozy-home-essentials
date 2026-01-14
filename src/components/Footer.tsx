import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream">
      {/* Newsletter Section */}
      <div className="border-b border-cream/10">
        <div className="container py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">
              Join Our Newsletter
            </h3>
            <p className="text-cream/70 mb-6">
              Subscribe for exclusive offers, new arrivals, and home styling tips.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/40 transition-colors"
              />
              <Button variant="hero" size="lg" className="bg-cream text-charcoal hover:bg-cream/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-2xl font-semibold">Nestora</span>
            <p className="mt-4 text-cream/70 text-sm leading-relaxed">
              Premium home textiles crafted for comfort and everyday luxury.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li><a href="#" className="hover:text-cream transition-colors">Bedsheets</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Pillow Covers</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Sofa Covers</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li><a href="#" className="hover:text-cream transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li><a href="#" className="hover:text-cream transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream/10 mt-12 pt-8 text-center text-sm text-cream/50">
          <p>© 2024 Nestora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
