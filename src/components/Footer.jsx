import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-jenaky-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-jenaky-900">JENAKY</h3>
            <p className="text-jenaky-700 text-sm leading-relaxed">
              Elegant fashion for the modern woman. Discover our curated collection of clothes, bags, and purses designed to make you shine.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-jenaky-600 hover:text-jenaky-900 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-jenaky-600 hover:text-jenaky-900 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-jenaky-600 hover:text-jenaky-900 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-jenaky-900 mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="/shop?category=Clothes" className="text-jenaky-700 hover:text-jenaky-900 text-sm">Clothes</a></li>
              <li><a href="/shop?category=Bags" className="text-jenaky-700 hover:text-jenaky-900 text-sm">Bags</a></li>
              <li><a href="/shop?category=Purses" className="text-jenaky-700 hover:text-jenaky-900 text-sm">Purses</a></li>
              <li><a href="/shop" className="text-jenaky-700 hover:text-jenaky-900 text-sm">New Arrivals</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-jenaky-900 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-jenaky-700 hover:text-jenaky-900 text-sm">Contact Us</a></li>
              <li><a href="#" className="text-jenaky-700 hover:text-jenaky-900 text-sm">Shipping & Returns</a></li>
              <li><a href="#" className="text-jenaky-700 hover:text-jenaky-900 text-sm">FAQ</a></li>
              <li><a href="#" className="text-jenaky-700 hover:text-jenaky-900 text-sm">Size Guide</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-jenaky-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start text-jenaky-700 text-sm">
                <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>123 Fashion Ave, Suite 101<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center text-jenaky-700 text-sm">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-jenaky-700 text-sm">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>hello@jenaky.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-jenaky-200 mt-12 pt-8 text-center text-jenaky-600 text-xs">
          <p>&copy; {new Date().getFullYear()} Jenaky Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
