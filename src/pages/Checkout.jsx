
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Checkout({ cartItems, onClearCart }) {
  const [formData, setFormData] = useState({
    fullName: '',
    shippingAddress: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  function handleConfirmOrder() {
    if (
      formData.fullName === '' ||
      formData.shippingAddress === '' ||
      formData.phoneNumber === ''
    ) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    onClearCart();
    setOrderConfirmed(true);
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
      {orderConfirmed ? (
        <div className="flex flex-col items-center text-center gap-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <h1 className="text-2xl font-bold text-gray-900">
            Order Confirmed! 🎉
          </h1>
          <p className="text-gray-500">
            Thank you, {formData.fullName}. Your order will be delivered soon.
          </p>
          <Link to="/">
            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-medium mt-2 hover:bg-gray-800 transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Shipping Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Address
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  value={formData.shippingAddress}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      shippingAddress: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, phoneNumber: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              {cartItems.map((item) => {
                return (
                  <div className="flex justify-between text-sm" key={item.id}>
                    <span className="text-gray-700">
                      {item.name} x {item.quantity}
                    </span>

                    <span className="text-gray-900 font-medium">
                      {item.quantity * item.price}
                    </span>
                  </div>
                );
              })}
            </div>
            <hr className="border-gray-200 my-4" />
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-lg font-bold text-gray-900">
                {total} EGP
              </span>
            </div>
            {error && (
              <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg mb-3">
                {error}
              </p>
            )}
            <button
              onClick={handleConfirmOrder}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
