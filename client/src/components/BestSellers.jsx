import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSellers = () => {
  const { products } = useAppContext();
  return (
    <div className="mt-[80px] mb-[80px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-[30px] sm:text-[36px] md:text-[42px] font-bold leading-tight text-center text-primary-950">
          Our Best Sellers
        </h2>
        <p className="text-center text-base sm:text-lg text-primary-950">
          Top Picks Everyone Loves
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6 mt-10 justify-center mx-auto">
        {products
          .filter((product) => product.inStock)
          .slice(0, 6)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSellers;
