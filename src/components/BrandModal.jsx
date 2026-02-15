import { useEffect, useState } from 'react';
import { X, Star } from 'lucide-react';

const BrandModal = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
        const timer = setTimeout(() => setShow(false), 300);
        return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div 
        className={`relative bg-white w-full max-w-lg rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 ease-out ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full p-1"
        >
          <X size={24} />
        </button>

        <div className="relative h-64">
           <img 
            src="https://images.unsplash.com/photo-1509319117193-518da72778cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Jenaky Luxury"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              e.target.onerror = null;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jenaky-900 via-jenaky-900/60 to-transparent flex flex-col justify-end p-8 text-center">
            <h2 className="text-4xl font-serif font-bold text-white mb-2">JENAKY</h2>
            <p className="text-jenaky-100 font-light tracking-wide uppercase text-sm">Exclusive Collection</p>
          </div>
        </div>

        <div className="p-8 text-center space-y-6">
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={20} className="fill-jenaky-400 text-jenaky-400" />
            ))}
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-gray-900 leading-tight">
            "Where Elegance Meets Excellence"
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            Experience the finest quality materials and craftsmanship. Our signature collection is designed for those who appreciate the details.
          </p>

          <button 
            onClick={onClose}
            className="w-full bg-jenaky-900 text-white py-4 rounded-lg font-medium tracking-wide hover:bg-jenaky-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            Explore the Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
