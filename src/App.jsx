import './App.css';
import { products as initialProducts } from './products';
import ProductCard from './ProductCard';
import { useState, useEffect, use } from 'react';
import Cart from './Cart';
import Header from './Header';
import ProductDetail from './ProductDetail';

// React Router DOM
import { Route, Routes } from 'react-router-dom';

// Matrial UI
import {
  Container,
  Paper,
  Grid,
  TextField,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function App() {
  // state
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [selectOrder, setSelectOrder] = useState('');

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

    // return product.category === selectedCategory || selectedCategory === "all";
    // if (product.category === selectedCategory || selectedCategory === "all") {
    //   return true;
    // }
    //   return false;
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

  return (
    <>
      <Header cartItemCount={cart.length} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Search & Filters */}
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 3,
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    {/* Search */}
                    <Grid size={{ xs: 12, md: 5 }}>
                      <TextField
                        label="Search Products"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Grid>

                    {/* Sort */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <FormControl fullWidth>
                        <InputLabel>Sort By</InputLabel>

                        <Select
                          value={selectOrder}
                          label="Sort By"
                          onChange={(e) => setSelectOrder(e.target.value)}
                        >
                          <MenuItem value="lowToHigh">
                            Price: Low to High
                          </MenuItem>

                          <MenuItem value="highToLow">
                            Price: High to Low
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Categories */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        <Button
                          variant={
                            selectedCategory === 'all'
                              ? 'contained'
                              : 'outlined'
                          }
                          onClick={() => setSelectedCategory('all')}
                        >
                          All
                        </Button>

                        <Button
                          variant={
                            selectedCategory === 'shoes'
                              ? 'contained'
                              : 'outlined'
                          }
                          onClick={() => setSelectedCategory('shoes')}
                        >
                          Shoes
                        </Button>

                        <Button
                          variant={
                            selectedCategory === 'clothes'
                              ? 'contained'
                              : 'outlined'
                          }
                          onClick={() => setSelectedCategory('clothes')}
                        >
                          Clothes
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Products */}
                <Grid container spacing={3}>
                  {filteredProducts.map((product) => (
                    <Grid
                      key={product.id}
                      size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                      }}
                    >
                      <ProductCard product={product} onAddToCart={addToCart} />
                    </Grid>
                  ))}
                </Grid>
              </Container>
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
      </Routes>
      {/*cart component */}
    </>
  );
}

export default App;
