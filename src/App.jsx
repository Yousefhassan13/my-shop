import './App.css';
import { products } from './products';
import ProductCard from './ProductCard';
import { useState, useEffect, use } from 'react';
import Cart from './Cart';
import Header from './Header';
import ProductDetail from './ProductDetail';

// React Router DOM
import { Route, Routes } from 'react-router-dom';

// Matrial UI
import { TextField } from '@mui/material';
import { Button, Stack } from '@mui/material';
import { Grid } from '@mui/material';

function App() {
  // state
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

    // return product.category === selectedCategory || selectedCategory === "all";
    // if (product.category === selectedCategory || selectedCategory === "all") {
    //   return true;
    // }
    //   return false;
  });

  return (
    <>
      <Header cartItemCount={cart.length} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TextField
                label="Search..."
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ margin: 2, width: 'calc(100% - 32px)' }}
              />
              <Stack direction="row" spacing={1} sx={{ margin: 2 }}>
                <Button
                  variant={
                    selectedCategory === 'all' ? 'contained' : 'outlined'
                  }
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </Button>
                <Button
                  variant={
                    selectedCategory === 'shoes' ? 'contained' : 'outlined'
                  }
                  onClick={() => setSelectedCategory('shoes')}
                >
                  Shoes
                </Button>
                <Button
                  variant={
                    selectedCategory === 'clothes' ? 'contained' : 'outlined'
                  }
                  onClick={() => setSelectedCategory('clothes')}
                >
                  clothes
                </Button>
              </Stack>
              <Grid container spacing={2} sx={{ margin: 4 }}>
                {filteredProducts.map((product) => (
                  <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <ProductCard product={product} onAddToCart={addToCart} />
                  </Grid>
                ))}
              </Grid>
            </>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetail products={products} onAddToCart={addToCart} />
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
      </Routes>
      {/*cart component */}
    </>
  );
}

export default App;
