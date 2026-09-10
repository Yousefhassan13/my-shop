//Matrial UI
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <Card sx={{ maxWidth: 250, margin: 2 }}>
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardMedia
          component="img"
          height="180"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h6">{product.name}</Typography>

          <Typography variant="body1" color="text.secondary">
            {product.price} EGP
          </Typography>
        </CardContent>
      </Link>
      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click from propagating to the Link
          onAddToCart(product);
        }}
      >
        Add to Cart
      </Button>
    </Card>
  );
}
