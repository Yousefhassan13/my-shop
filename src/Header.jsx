import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

export default function Header({ cartItemCount, currentUser, onLogout }) {
  return (
    <div>
      <header className="flex justify-between items-center bg-blue-600 px-5 py-4 ">
        <Link to="/" className="text-white text-xl font-semibold no-underline">
          My Shop
        </Link>

        {/* icon cart + icon login + icon signup*/}
        <div className="right-side flex items-center gap-8">
          <Link to="/cart" className="relative text-white">
            <ShoppingCartIcon />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {currentUser ? (
            <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-full pl-1 pr-4 py-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-white text-sm font-medium">
                {currentUser.name}
              </span>
              <button
                onClick={onLogout}
                className="text-white/70 hover:text-white text-xs ml-2 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-white/90 hover:text-white text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-blue-600 hover:bg-blue-50 text-sm font-semibold px-4 py-1.5 rounded-full transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
