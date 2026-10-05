import Home from './pages/Home.js';
import { useState, useEffect } from 'react';
import Cart from './pages/Cart.js';
import Header from './components/Header.js';
import ProductDetail from './pages/ProductDetail.js';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Checkout from './pages/Checkout.js';
// React Router DOM
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// import TypeScript interfaces
import type { Product,CartItem,User,Review,ProductResponse,ApiResponse  } from './data/products.js';



function App() {
  // state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  // state products
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [selectOrder, setSelectOrder] = useState('');
  const [currentUser, setCurrentUser] = useState<User|null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setLoading(false);
      return;
    }
    async function fetchProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data:ApiResponse = await response.json();
        const productsWithReviews = data.products.map((product ) => ({
          ...product,
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.thumbnail,
          category: product.category,
          description: product.description,
          reviews: [],
        }));
        setProducts(productsWithReviews);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
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
  function addToCart(product:Product) {
    const existingItem = cart.find((item) => item.id === product.id);
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

  function removeFromCart(productId:Product['id']) {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  }

  // Update Quantity

  function updateQuantity(productId:Product["id"], amount:number) {
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
  function addReview(productId:Product['id'], review:Review) {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, reviews: [...product.reviews, review] };
      }
      return product;
    });
    setProducts(updatedProducts);
  }
  // login user
  function loginUser(user:User) {
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
              <Home
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectOrder={selectOrder}
                setSelectOrder={setSelectOrder}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                filteredProducts={filteredProducts}
                onAddToCart={addToCart}
                categories={categories}
              />
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
          element={
            currentUser ? (
              <Checkout cartItems={cart} onClearCart={clearCart} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      {/*cart component */}
    </>
  );
}

export default App;
