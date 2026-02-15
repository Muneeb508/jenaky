import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import classNames from 'classnames';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Jenaky', path: '/shop?brand=Jenaky' },
    { name: 'Clothes', path: '/shop?category=Clothes' },
    { name: 'Bags', path: '/shop?category=Bags' },
    { name: 'Purses', path: '/shop?category=Purses' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-jenaky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-jenaky-800 hover:text-jenaky-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start">
            <Link to="/" className="flex items-center">
              <Logo className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => {
              const isActive = (path) => {
                const currentPath = location.pathname + location.search;
                if (path === '/') return currentPath === '/';
                if (path === '/shop') return currentPath === '/shop' || currentPath === '/shop?category=All' || currentPath === '/shop?'; // Handle basic shop link
                return currentPath === path;
              };

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={classNames(
                    'text-sm font-medium transition-colors duration-200',
                    isActive(link.path) 
                      ? 'text-jenaky-900 border-b-2 border-jenaky-400' 
                      : 'text-gray-500 hover:text-jenaky-700'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-jenaky-600 transition-colors">
              <Search size={20} />
            </button>
            <button 
              className="text-gray-400 hover:text-jenaky-600 transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-jenaky-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-jenaky-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
               const isActive = (path) => {
                const currentPath = location.pathname + location.search;
                 if (path === '/') return currentPath === '/';
                if (path === '/shop') return currentPath === '/shop' || currentPath === '/shop?category=All';
                return currentPath === path;
              };

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={classNames(
                    'block px-3 py-2 rounded-md text-base font-medium',
                    isActive(link.path)
                      ? 'bg-jenaky-50 text-jenaky-900' 
                      : 'text-gray-600 hover:bg-jenaky-50 hover:text-jenaky-900'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
