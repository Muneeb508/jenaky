import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const total = getCartTotal();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'cod', // 'cod' or 'card'
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setOrderId(Math.floor(100000 + Math.random() * 900000)); // Generate random order ID
      clearCart();
      window.scrollTo(0, 0);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Thank you for your order!</h1>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Your order <span className="font-semibold text-gray-900">#{orderId}</span> has been confirmed. 
          We have sent a confirmation email to <span className="font-semibold text-gray-900">{formData.email}</span>.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-jenaky-900 text-white px-8 py-3 rounded-md font-medium hover:bg-jenaky-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <Link
          to="/shop"
          className="inline-block bg-jenaky-900 text-white px-8 py-3 rounded-md font-medium hover:bg-jenaky-800 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/cart" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
        <ArrowLeft size={16} className="mr-2" />
        Back to Cart
      </Link>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 gap-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-jenaky-500 focus:ring-jenaky-500 sm:text-sm px-4 py-2 border"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-jenaky-500 focus:ring-jenaky-500 sm:text-sm px-4 py-2 border"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-jenaky-500 focus:ring-jenaky-500 sm:text-sm px-4 py-2 border"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-jenaky-500 focus:ring-jenaky-500 sm:text-sm px-4 py-2 border"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-jenaky-500 focus:ring-jenaky-500 sm:text-sm px-4 py-2 border"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-jenaky-500 focus:ring-jenaky-500 sm:text-sm px-4 py-2 border"
                  />
                </div>
                 <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-jenaky-500 focus:ring-jenaky-500 sm:text-sm px-4 py-2 border"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div 
                  className={`flex items-center p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'cod' ? 'border-jenaky-500 bg-jenaky-50' : 'border-gray-200'}`}
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                >
                  <input
                    id="cod"
                    name="paymentMethod"
                    type="radio"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    value="cod"
                    className="focus:ring-jenaky-500 h-4 w-4 text-jenaky-600 border-gray-300"
                  />
                  <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700 flex-1 cursor-pointer">
                    <span className="flex items-center">
                      <Truck className="mr-2 text-gray-500" size={20} />
                      Cash on Delivery
                    </span>
                  </label>
                </div>

                <div 
                  className={`flex items-center p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'card' ? 'border-jenaky-500 bg-jenaky-50' : 'border-gray-200'}`}
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                >
                  <input
                    id="card"
                    name="paymentMethod"
                    type="radio"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    value="card"
                    className="focus:ring-jenaky-500 h-4 w-4 text-jenaky-600 border-gray-300"
                  />
                  <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700 flex-1 cursor-pointer">
                     <span className="flex items-center">
                      <CreditCard className="mr-2 text-gray-500" size={20} />
                      Credit/Debit Card
                    </span>
                  </label>
                </div>

                {/* Card Details (Mock) */}
                {formData.paymentMethod === 'card' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md space-y-4 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        required={formData.paymentMethod === 'card'}
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="0000 0000 0000 0000"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-jenaky-500 focus:ring-jenaky-500 sm:text-sm px-4 py-2 border"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">Expiry date (MM/YY)</label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          required={formData.paymentMethod === 'card'}
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-jenaky-500 focus:ring-jenaky-500 sm:text-sm px-4 py-2 border"
                        />
                      </div>
                      <div>
                        <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">CVC</label>
                        <input
                          type="text"
                          id="cardCvc"
                          name="cardCvc"
                          required={formData.paymentMethod === 'card'}
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-jenaky-500 focus:ring-jenaky-500 sm:text-sm px-4 py-2 border"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Name on card</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        required={formData.paymentMethod === 'card'}
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-jenaky-500 focus:ring-jenaky-500 sm:text-sm px-4 py-2 border"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-jenaky-900 text-white py-4 rounded-lg font-medium tracking-wide hover:bg-jenaky-800 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing Order...' : `Pay Rs. ${(total + 250).toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* Order Summary (Right Column) */}
        <div className="mt-10 lg:mt-0 lg:col-span-5">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={`${item.id}-${item.size}`} className="flex py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover object-center"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                      e.target.onerror = null;
                    }}
                  />
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3 className="line-clamp-1">{item.name}</h3>
                      <p className="ml-4">Rs. {item.price.toLocaleString()}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                    <div className="flex justify-between items-center mt-2">
                       <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                       {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">Rs. {total.toLocaleString()}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Shipping</dt>
                <dd className="text-sm font-medium text-gray-900">Rs. 250</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="text-base font-medium text-gray-900">Rs. {(total + 250).toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
