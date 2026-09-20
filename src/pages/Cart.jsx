import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Checkout from './Checkout';
import { Link } from 'react-router-dom';

export default function Cart({ cartItems, onRemove, onUpdateQuantity }) {
  const total = cartItems.reduce(
    (sum, item) => Math.trunc(sum + item.price * item.quantity),
    0
  );

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1 sm:hidden">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {item.price} $ each
                </p>
              </div>
            </div>

            <div className="hidden sm:block flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{item.price} $ each</p>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:gap-4">
              <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
                <button
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-gray-600 transition-colors"
                >
                  <RemoveIcon fontSize="small" />
                </button>
                <span className="w-6 text-center font-medium text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-gray-600 transition-colors"
                >
                  <AddIcon fontSize="small" />
                </button>
              </div>

              <p className="font-semibold text-gray-900">
                {item.price * item.quantity} $
              </p>

              <button
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between mt-6">
          <span className="text-gray-600 font-medium">Total</span>
          <span className="text-2xl font-bold text-gray-900">{total} $</span>
        </div>

        {cartItems.length > 0 && (
          <Link to="/checkout">
            <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors mt-2">
              Proceed to Checkout
            </button>
          </Link>
        )}
      </div>
    </>
  );
}
