import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.85]"
          />
        </div>
        <div className="relative z-10 text-center text-white space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
            Elegance is an Attitude
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto">
            Discover the latest collection of premium fashion designed for the modern woman.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-jenaky-900 px-8 py-4 font-medium tracking-wide hover:bg-jenaky-50 transition-colors duration-300"
          >
            Shop Collection
          </Link>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-jenaky-900">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Jenaky', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', link: '/shop?brand=Jenaky' },
            { name: 'Clothes', image: 'https://images.unsplash.com/photo-1550614000-4b9519e494b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', link: '/shop?category=Clothes' },
            { name: 'Bags', image: 'https://images.unsplash.com/photo-1590874103328-32752a9a0503?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', link: '/shop?category=Bags' },
            { name: 'Purses', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', link: '/shop?category=Purses' },
          ].map((cat) => (
            <Link key={cat.name} to={cat.link} className="group relative h-96 overflow-hidden block text-white text-center">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  e.target.onerror = null;
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-serif font-bold tracking-widest uppercase">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-serif font-bold text-jenaky-900">Featured Items</h2>
          <Link to="/shop" className="text-jenaky-600 hover:text-jenaky-900 flex items-center text-sm font-medium">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-jenaky-900 text-jenaky-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Join the Jenaky Community</h2>
          <p className="max-w-xl mx-auto text-jenaky-200">
            Subscribe to our newsletter and get 15% off your first order. Be the first to know about new arrivals and exclusive offers.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-jenaky-300 focus:outline-none focus:ring-2 focus:ring-jenaky-400"
            />
            <button className="bg-jenaky-100 text-jenaky-900 px-6 py-3 font-medium hover:bg-white transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
