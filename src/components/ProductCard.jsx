import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault(); // Prevent navigation if clicking the button
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {product.featured && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-serif uppercase tracking-wider text-jenaky-900">
            Featured
          </div>
        )}
        
        {/* Quick Add Button - Visible on Hover */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md text-jenaky-800 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-jenaky-500 hover:text-white"
          title="Add to Cart"
        >
          <ShoppingBag size={20} />
        </button>
      </div>
      
      <div className="mt-4 space-y-1">
        <p className="text-xs text-jenaky-600 uppercase tracking-wide">{product.brand}</p>
        <p className="text-sm font-semibold text-jenaky-800">Rs. {product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
