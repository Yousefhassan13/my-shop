import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product.id}`} className="no-underline">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>

          <p className="text-blue-500 font-semibold">{product.price} $</p>
        </div>
      </Link>
      <button
        className="w-full py-3 rounded-3xl bg-blue-500 text-white hover:bg-blue-700 transition-colors"
        onClick={(e) => {

          onAddToCart(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
