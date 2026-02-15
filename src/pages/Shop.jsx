import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import BrandModal from '../components/BrandModal';
import { Filter, X } from 'lucide-react';
import classNames from 'classnames';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const brandParam = searchParams.get('brand');
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (brandParam) {
      result = result.filter(p => p.brand === brandParam);
      if (brandParam === 'Jenaky') {
        const hasSeenModal = sessionStorage.getItem('jenakyModalSeen');
        // Uncomment next line to only show once per session, currently showing every time as per request
        // if (!hasSeenModal) {
          setIsBrandModalOpen(true);
          sessionStorage.setItem('jenakyModalSeen', 'true');
        // }
      }
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setFilteredProducts(result);
  }, [selectedCategory, priceRange, brandParam]);

  const categories = ['All', 'Clothes', 'Bags', 'Purses'];

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    
    setSearchParams(newParams);
    setIsMobileFiltersOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
        <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900">
          {brandParam === 'Jenaky' ? 'Jenaky Collection' : 'Shop'}
        </h1>

        <div className="flex items-center">
          <button
            type="button"
            className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <span className="sr-only">Filters</span>
            <Filter size={20} />
          </button>
        </div>
      </div>

      {brandParam === 'Jenaky' && (
        <div className="relative bg-jenaky-900 rounded-lg overflow-hidden mb-8 mt-6">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Jenaky Brand" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                e.target.onerror = null;
              }}
            />
          </div>
          <div className="relative z-10 px-6 py-12 md:py-16 text-center text-white">
            <span className="block text-sm font-semibold tracking-[0.2em] mb-2 text-jenaky-200">PREMIUM QUALITY</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">JENAKY</h2>
            <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto text-jenaky-100 italic">
              "Signature Style. Premium Quality."
            </p>
          </div>
        </div>
      )}

      <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        {/* Filters (Desktop) */}
        <aside className="hidden lg:block">
          <div className="space-y-10 divide-y divide-gray-200">
            <div>
              <fieldset>
                <legend className="block text-sm font-medium text-gray-900">Category</legend>
                <div className="pt-6 space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        name="category"
                        type="radio"
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 border-gray-300 text-jenaky-600 focus:ring-jenaky-500 cursor-pointer"
                      />
                      <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-600 cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="pt-10">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-900">Price Range</legend>
                <div className="pt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Rs. {priceRange[0]}</span>
                    <span>Rs. {priceRange[1].toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60000"
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-jenaky-600"
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </aside>

        {/* Filters (Mobile) */}
        {isMobileFiltersOpen && (
          <div className="relative z-40 lg:hidden">
            <div className="fixed inset-0 bg-black/25" onClick={() => setIsMobileFiltersOpen(false)} />
            <div className="fixed inset-0 z-40 flex">
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setIsMobileFiltersOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mt-4 px-4 border-t border-gray-200">
                  <div className="pt-4 pb-4">
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-900">Category</legend>
                      <div className="pt-4 space-y-3">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <input
                              id={`mobile-category-${category}`}
                              name="mobile-category"
                              type="radio"
                              checked={selectedCategory === category}
                              onChange={() => handleCategoryChange(category)}
                              className="h-4 w-4 border-gray-300 text-jenaky-600 focus:ring-jenaky-500"
                            />
                            <label htmlFor={`mobile-category-${category}`} className="ml-3 text-sm text-gray-600">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="lg:col-span-2 xl:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No products found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 xl:gap-x-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <BrandModal isOpen={isBrandModalOpen} onClose={() => setIsBrandModalOpen(false)} />
    </div>
  );
};

export default Shop;
