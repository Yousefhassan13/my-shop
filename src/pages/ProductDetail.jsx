import { useParams } from 'react-router-dom';
import { useState } from 'react';
// Material UI
import { Rating } from '@mui/material';

export default function ProductDetail({ products, onAddToCart, onAddReview }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [error, setError] = useState('');
  // State
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  if (!product) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center">
        <p className="text-xl font-semibold text-gray-900">Product not found</p>
        <p className="text-gray-500 mt-2">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }
  const totalRating = product.reviews.reduce((sum, review) => {
    return sum + review.rating;
  }, 0);

  const averageRating =
    product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

  function handleSubmitReview() {
    if (newComment === '') {
      setError('Please write a comment before submitting');
      return;
    }
    setError('');
    const review = { name: 'user', rating: newRating, comment: newComment };
    onAddReview(product.id, review);
    setNewRating(0);
    setNewComment('');
  }
  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Product card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <img
            className="w-full h-96 object-cover"
            src={product.image}
            alt={product.name}
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-2 mt-3">
              <Rating
                value={averageRating}
                readOnly
                precision={0.5}
                size="small"
              />
              <span className="text-gray-500 text-sm">
                {averageRating.toFixed(1)} ({product.reviews.length} reviews)
              </span>
            </div>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center justify-between mt-6">
              <span className="text-3xl font-bold text-gray-900">
                {product.price} EGP
              </span>
            </div>

            <button
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold mt-6 hover:bg-gray-800 transition-colors"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Add review */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Write a review
          </h2>
          <Rating
            value={newRating}
            onChange={(e, value) => setNewRating(value)}
          />
          <textarea
            rows="3"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-3 focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
            placeholder="Share your thoughts about this product..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-medium mt-3 hover:bg-gray-800 transition-colors"
            onClick={handleSubmitReview}
          >
            Submit review
          </button>

          {error && (
            <p className="text-red-600 text-sm mt-2 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}
        </div>

        {/* Reviews list */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Reviews ({product.reviews.length})
          </h2>

          {product.reviews.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-400">
              No reviews yet — be the first to share your thoughts.
            </div>
          ) : (
            <div className="space-y-3">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-100 p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <Rating value={review.rating} readOnly size="small" />
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
