import { useParams } from 'react-router-dom';
// Material UI
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
export default function ProductDetail({ products, onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  console.log('الـ id من الرابط:', id);
  console.log('المنتج اللي لقيته:', product);

  if (!product) {
    return <Typography sx={{ margin: 2 }}> Not Found Product </Typography>;
  }
  return (
    <Card sx={{ maxWidth: 500, margin: 2 }}>
      <CardMedia
        component="img"
        height="300"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          {product.description}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          {product.price} EGP
        </Typography>
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
