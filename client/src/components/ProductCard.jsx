import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast"; // Import toast for notifications

const ProductCard = ({ product }) => {
  // Destructure necessary functions and variables from the global app context
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  // Wrapper function to add a product to the cart and dismiss any previous toast notifications
  const handleAddToCart = (productId) => {
    toast.dismiss();
    addToCart(productId);
  };

  // Wrapper function to remove a product from the cart and dismiss any previous toast notifications
  const handleRemoveFromCart = (productId) => {
    toast.dismiss();
    removeFromCart(productId);
  };

  return (
    product && (
      // Container for the product card with click handler to navigate to the product details page
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
          scrollTo(0, 0); // Scroll to top when navigating
        }}
        className="border border-secondary-900/30 rounded-[10px] px-3 py-3 bg-background max-w-54 w-full mx-auto"
      >
        {/* Image container with hover zoom effect */}
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
            src={product.image[0]}
            alt={`Image of ${product.name}`}
          />
        </div>

        {/* Product details */}
        <div className="text-secondary-900/60 text-sm">
          {/* Product category */}
          <p>{product.category}</p>

          {/* Product name with truncation to prevent overflow */}
          <p className="text-secondary-950 text-base sm:text-lg font-medium truncate w-full">
            {product.name}
          </p>

          {/* Price and cart controls */}
          <div className="flex items-end justify-between mt-[16px]">
            {/* Pricing info */}
            <div className="flex flex-col md:text-xl text-base font-medium text-primary-500">
              <div>
                {/* Display currency symbol with offer price */}
                <span className="text-sm">{currency}</span>
                {product.offerPrice}
              </div>

              {/* Show original price as strikethrough */}
              <span className="text-secondary-900/60 md:text-sm text-xs line-through">
                {currency}
                {product.price}
              </span>
            </div>

            {/* Add/remove cart buttons container */}
            <div
              // Prevent card click navigation when interacting with cart buttons
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-primary-500"
            >
              {/* Show Add button if product not in cart */}
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-primary-500/10 border border-primary-500/40 md:w-[80px] w-[64px] h-[44px] rounded-full text-primary-500 cursor-pointer"
                  onClick={() => handleAddToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="Cart icon" />
                  Add
                </button>
              ) : (
                /* Show quantity controls if product is already in cart */
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[44px] bg-primary-500/10 rounded-full select-none">
                  {/* Decrement button */}
                  <button
                    onClick={() => {
                      handleRemoveFromCart(product._id);
                    }}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>

                  {/* Current quantity */}
                  <span className="w-5 text-center">
                    {cartItems[product._id]}
                  </span>

                  {/* Increment button */}
                  <button
                    onClick={() => {
                      handleAddToCart(product._id);
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
