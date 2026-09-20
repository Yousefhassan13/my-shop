import { products as initialProducts } from './products';
import ProductCard from './ProductCard';
import { useState, useEffect, use } from 'react';
import Cart from './Cart';
import Header from './Header';
import ProductDetail from './ProductDetail';
import Signup from './Signup';
import Login from './Login';
import Checkout from './Checkout';
// React Router DOM
import { Route, Routes } from 'react-router-dom';

function App() {
  // state
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });
  const [selectOrder, setSelectOrder] = useState('');
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
useEffect(() => {
  localStorage.setItem('products', JSON.stringify(products));
}, [products]);
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (selectOrder === 'lowToHigh') {
      const sortedProducts = [...products].sort((a, b) => {
        return a.price - b.price;
      });
      setProducts(sortedProducts);
    } else if (selectOrder === 'highToLow') {
      const sortedProducts = [...products].sort((a, b) => {
        return b.price - a.price;
      });
      setProducts(sortedProducts);
    }
  }, [selectOrder]);

  // Add Item to Cart
  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);
    console.log('existingItem:', existingItem);
    if (existingItem) {
      const updatedCard = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setCart(updatedCard);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  // Remove Item from cart

  function removeFromCart(productId) {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  }

  // Update Quantity

  function updateQuantity(productId, amount) {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          if (newQuantity <= 0) {
            return null;
          } else {
            return { ...item, quantity: newQuantity };
          }
        }

        return item;
      })
      .filter((item) => item !== null);

    setCart(updatedCart);
  }

  const filteredProducts = products.filter((product) => {
    const matchesGategory =
      product.category === selectedCategory || selectedCategory === 'all';

    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesGategory && matchesSearchTerm;
  });

  // Add Reviews
  function addReview(productId, review) {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, reviews: [...product.reviews, review] };
      }
      return product;
    });
    setProducts(updatedProducts);
  }
  // login user
  function loginUser(user) {
    setCurrentUser(user);
  }
  // logout user
  function logout() {
    setCurrentUser(null);
  }

  function clearCart() {
    setCart([]);
  }
  return (
    <>
      <Header
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        currentUser={currentUser}
        onLogout={logout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Search & Filters */}
                <div className="bg-white shadow-md rounded-xl p-6 mb-8">
                  <div className="flex flex-wrap gap-4 items-center">
                    {/* Search */}

                    <input
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="Search Products"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Sort */}

                    <select
                      value={selectOrder}
                      onChange={(e) => setSelectOrder(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sort By</option>
                      <option value="lowToHigh">Price: Low to High</option>
                      <option value="highToLow">Price: High to Low</option>
                    </select>

                    {/* Categories */}

                    <div className="flex flex-wrap gap-2">
                      <button
                        className={`px-4 py-2 rounded-lg border transition-colors  ${selectedCategory === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-500 text-blue-500 bg-white'}`}
                        onClick={() => setSelectedCategory('all')}
                      >
                        All
                      </button>

                      <button
                        className={`px-4 py-2 rounded-lg border transition-colors  ${selectedCategory === 'shoes' ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-500 text-blue-500 bg-white'}`}
                        onClick={() => setSelectedCategory('shoes')}
                      >
                        Shoes
                      </button>

                      <button
                        className={`px-4 py-2 rounded-lg border transition-colors  ${selectedCategory === 'clothes' ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-500 text-blue-500 bg-white'}`}
                        onClick={() => setSelectedCategory('clothes')}
                      >
                        Clothes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetail
              products={products}
              onAddToCart={addToCart}
              onAddReview={addReview}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cart}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={loginUser} />} />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cart} onClearCart={clearCart} />}
        />
      </Routes>
      {/*cart component */}
    </>
  );
}

export default App;
