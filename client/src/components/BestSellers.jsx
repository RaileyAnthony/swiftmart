import ProductCard from "./ProductCard.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const BestSellers = () => {
  // Accessing the shared list of products from the application context
  const { products } = useAppContext();

  return (
    <div className="mt-[80px] mb-[80px]">
      {/* Section Heading */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[30px] sm:text-[36px] md:text-[42px] font-bold leading-tight text-center text-primary-950">
          Our Best Sellers
        </h2>
        <p className="text-center text-base sm:text-lg text-primary-950">
          Top Picks Everyone Loves
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6 mt-10 justify-center mx-auto">
        {products
          // Filter only the products that are in stock
          .filter((product) => product.inStock)
          // Limit the displayed products to the top 6
          .slice(0, 6)
          // Render each product using the ProductCard component
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSellers;
