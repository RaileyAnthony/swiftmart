import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const addressDropdownRef = useRef(null); // Reference for the dropdown

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.dismiss(); // Dismiss any previous toasts
        toast.error(
          data.message || "An unexpected error occurred. Please try again."
        );
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const { data } = await axios.delete(`/api/address/delete/${addressId}`);
      if (data.success) {
        toast.dismiss();
        toast.success(data.message);

        // Refresh the address list after deletion
        const updatedAddresses = addresses.filter(
          (address) => address._id !== addressId
        );
        setAddresses(updatedAddresses);

        if (updatedAddresses.length > 0) {
          setSelectedAddress(updatedAddresses[0]);
        } else {
          setSelectedAddress(null); // No address available
        }
      } else {
        toast.dismiss();
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!user) {
        toast.dismiss();
        return toast.error("Please log in first to place an order");
      }

      if (!selectedAddress) {
        toast.dismiss();
        return toast.error("Please select an address");
      }

      // Place order with COD
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });
        if (data.success) {
          toast.dismiss();
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.dismiss();
          toast.error(data.message);
        }
      } else {
        // Place order with stripe
        const { data } = await axios.post("/api/order/stripe", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });
        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.dismiss();
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  // Close the address dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        addressDropdownRef.current &&
        !addressDropdownRef.current.contains(event.target)
      ) {
        setShowAddress(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  const handleRemoveFromCart = (productId) => {
    toast.dismiss(); // Dismiss any previous toasts
    removeFromCart(productId);
  };

  const isCartEmpty = cartArray.length === 0;

  if (products.length > 0 && cartItems && isCartEmpty) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] mt-[137px] mb-[80px] px-6 md:px-16 lg:px-24 xl:px-32">
        <h1 className="text-[30px] sm:text-[36px] md:text-[42px] font-bold leading-tight text-center text-secondary-950 mb-2">
          Your Shopping Cart is Empty!
        </h1>
        <p className="text-center text-base sm:text-lg text-secondary-900 mb-[32px]">
          You can add the products to your cart to continue shopping.
        </p>
        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
          className="bg-primary-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-600 transition cursor-pointer"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-[137px] mb-[80px] px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-[30px] sm:text-[36px] md:text-[42px] font-bold leading-tight text-secondary-950 mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary-500">
            {getCartCount()} Item/s
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-secondary-900 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-secondary-900 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-secondary-900/60">
                  <div className="flex items-center">
                    <p>Quantity:</p>
                    <select
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      value={cartItems[product._id]}
                      className="outline-none cursor-pointer"
                    >
                      {Array(
                        cartItems[product._id] > 9 ? cartItems[product._id] : 9
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => handleRemoveFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="Remove"
                className="inline-block w-6 h-6 hover:opacity-70 transition-all"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary-500 hover:text-primary-600 font-medium"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt="Arrow right"
            className="group-hover:-translate-x-1 transition hover:text-primary-600"
          />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] rounded-[10px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-secondary-900/70">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No Address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary-500 hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div
                ref={addressDropdownRef}
                className="absolute top-12 py-1 bg-background border border-gray-300 text-sm w-full"
              >
                {addresses.map((address, index) => (
                  <div
                    key={address._id || index}
                    className="group relative p-2 hover:bg-gray-100"
                  >
                    <div className="flex justify-between items-center">
                      <p
                        onClick={() => {
                          setSelectedAddress(address);
                          setShowAddress(false);
                        }}
                        className="text-gray-500 cursor-pointer"
                      >
                        {address.street}, {address.city}, {address.state},{" "}
                        {address.country}
                      </p>
                      <button
                        onClick={() => deleteAddress(address._id)}
                        className="text-red-500 text-xs ml-2 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                <p
                  onClick={() => {
                    if (!user) {
                      toast.error("Please log in first to add an address");
                      return;
                    }
                    navigate("/add-address");
                  }}
                  className="text-primary-500 text-center cursor-pointer p-2 hover:bg-primary-500/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-background px-3 py-2 mt-2 outline-none cursor-pointer rounded text-gray-500"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-secondary-900/70 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3 text-secondary-900">
            <span>Total Amount:</span>
            <span>
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-2.5 mt-6 cursor-pointer rounded-full bg-primary-500 text-background font-medium hover:bg-primary-600 transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
