import { useParams } from 'react-router-dom';
// Material UI
import {
  Rating,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { useState } from 'react';
export default function ProductDetail({ products, onAddToCart, onAddReview }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  // State
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  if (!product) {
    return <Typography sx={{ margin: 2 }}> Not Found Product </Typography>;
  }
  const totalRating = product.reviews.reduce((sum, review) => {
    return sum + review.rating;
  }, 0);

  const averageRating =
    product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

  function handleSubmitReview() {
    const review = { name: 'user', rating: newRating, comment: newComment };
    onAddReview(product.id, review);
    setNewRating(0);
    setNewComment('');
  }
  return (
    <>
      <Card sx={{ maxWidth: 500, margin: 2 }}>
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Rating value={averageRating} readOnly precision={0.5} />
          <Typography variant="body2" color="text.secondary">
            {averageRating.toFixed(1)} من 5 ({product.reviews.length} تقييم)
          </Typography>
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
      {/* Review  */}
      <Typography variant="h6" sx={{ marginTop: 3, paddingLeft: 1 }}>
        Add Review
      </Typography>
      <Rating
        value={newRating}
        onChange={(e, value) => setNewRating(value)}
        style={{ paddingLeft: '10px' }}
      />
      <TextField
        label="comment"
        fullWidth
        multiline
        rows={2}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        sx={{ marginTop: 1, marginLeft: 0 }}
      />
      <Button
        variant="contained"
        onClick={handleSubmitReview}
        sx={{ marginTop: 1 }}
      >
        Submit Review
      </Button>
      {/* Read reviews */}
      <Typography variant="h6" sx={{ marginTop: 3 }}>
        Reviews ({product.reviews.length})
      </Typography>

      {product.reviews.length === 0 ? (
        <Typography>لسه مفيش تقييمات - كن أول من يقيّم!</Typography>
      ) : (
        product.reviews.map((review, index) => (
          <Card key={index} sx={{ marginTop: 1, padding: 1 }}>
            <Typography variant="subtitle2">{review.name}</Typography>
            <Rating value={review.rating} readOnly size="small" />
            <Typography variant="body2">{review.comment}</Typography>
          </Card>
        ))
      )}
    </>
  );
}
