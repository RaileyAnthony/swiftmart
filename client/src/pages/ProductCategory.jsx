import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  // Access global products data
  const { products } = useAppContext();

  // Get category from URL params
  const { category } = useParams();

  // Find the matching category data
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  // Filter products by category and in-stock status
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category && product.inStock
  );

  return (
    <div className="mt-[137px] px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Category Heading */}
      {searchCategory && (
        <div className="flex flex-col">
          <h2 className="text-[30px] sm:text-[36px] md:text-[42px] font-bold leading-tight text-center text-secondary-950">
            {searchCategory.text}
          </h2>
          <p className="text-center text-base sm:text-lg text-secondary-950">
            {searchCategory.text2}
          </p>
        </div>
      )}

      {/* Show products if available, else show fallback message */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10 mb-[80px]">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium text-primary-500">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
