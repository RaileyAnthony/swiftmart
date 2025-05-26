import React from "react";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast"; // Import toast for notifications

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  const handleAddToCart = (productId) => {
    toast.dismiss(); // Dismiss any previous toasts
    addToCart(productId);
  };

  const handleRemoveFromCart = (productId) => {
    toast.dismiss(); // Dismiss any previous toasts
    removeFromCart(productId);
  };

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
          scrollTo(0, 0);
        }}
        className="border border-secondary-900/30 rounded-[10px] px-3 py-3 bg-background max-w-54 w-full mx-auto"
      >
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
            src={product.image[0]}
            alt={`Image of ${product.name}`}
          />
        </div>
        <div className="text-secondary-900/60 text-sm">
          <p>{product.category}</p>
          <p className="text-secondary-950 text-base sm:text-lg font-medium truncate w-full">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-3 md:w-3.5"
                  src={i < 5 ? assets.star_icon : assets.star_dull_icon}
                  alt="Star icon"
                />
              ))}
            <p>(5)</p>
          </div>

          <div className="flex items-end justify-between mt-[16px]">
            {/* FIX: Don't nest div inside p, use div here */}
            <div className="flex flex-col md:text-xl text-base font-medium text-primary-500">
              <div>
                <span className="text-sm">{currency}</span>
                {product.offerPrice}
              </div>
              <span className="text-secondary-900/60 md:text-sm text-xs line-through">
                {currency}
                {product.price}
              </span>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-primary-500"
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-primary-500/10 border border-primary-500/40 md:w-[80px] w-[64px] h-[44px] rounded-full text-primary-500 cursor-pointer"
                  onClick={() => handleAddToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="Cart icon" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[44px] bg-primary-500/10 rounded-full select-none">
                  <button
                    onClick={() => {
                      handleRemoveFromCart(product._id); // Use the wrapper function
                    }}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => {
                      handleAddToCart(product._id); // Use the wrapper function
                    }}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
