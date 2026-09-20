import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    const saveUser = localStorage.getItem('user');
    const user = saveUser ? JSON.parse(saveUser) : null;
    if (user) {
      if (
        user.email === formData.email &&
        user.password === formData.password
      ) {
        onLogin(user);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    }
  }
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 max-w-md mx-auto mt-16">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Login</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
            value={formData.email}
            onChange={(e) => {
              return setFormData({ ...formData, email: e.target.value });
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={formData.password}
              onChange={(e) => {
                return setFormData({ ...formData, password: e.target.value });
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <button
          className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-gray-900 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
