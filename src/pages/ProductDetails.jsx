import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, Minus, Plus, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id));
    setProduct(found);
    setQuantity(1);
    setSelectedSize(null);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, quantity, selectedSize);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse">
          <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <p className="text-lg text-jenaky-600 tracking-wide font-medium">{product.brand}</p>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900 my-4">{product.name}</h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-2xl text-gray-900">Rs. {product.price.toLocaleString()}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          <form className="mt-6">
            {/* Sizes */}
            {product.sizes && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-jenaky-600 hover:text-jenaky-500">
                    Size guide
                  </a>
                </div>

                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4 mt-4">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`
                        group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 focus:outline-none transition-all
                        ${selectedSize === size 
                          ? 'bg-jenaky-600 text-white border-transparent' 
                          : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'}
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              {/* Quantity */}
              <div className="flex items-center border border-gray-300 rounded-md w-32">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-gray-600 hover:text-gray-900"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-gray-600 hover:text-gray-900"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-jenaky-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-jenaky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jenaky-500 disabled:opacity-50 transition-colors"
                disabled={product.sizes && !selectedSize}
              >
                <ShoppingBag size={20} className="mr-2" />
                Add to Cart
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
