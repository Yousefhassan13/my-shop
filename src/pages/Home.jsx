import ProductCard from '../components/ProductCard';

export default function Home({
  searchTerm,
  setSearchTerm,
  selectOrder,
  setSelectOrder,
  selectedCategory,
  setSelectedCategory,
  filteredProducts,
  onAddToCart,
  categories,
}) {
  return (
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
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg border transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-blue-500 text-blue-500 bg-white'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </>
  );
}
