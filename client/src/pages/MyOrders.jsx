import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();
  const navigate = useNavigate();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  // Show empty orders message if user has no orders
  if (myOrders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] mt-[137px] mb-[80px] px-6 md:px-16 lg:px-24 xl:px-32">
        <h1 className="text-[30px] sm:text-[36px] md:text-[42px] font-bold leading-tight text-center text-secondary-950 mb-2">
          You have no orders yet!
        </h1>
        <p className="text-center text-base sm:text-lg text-secondary-900 mb-[32px]">
          You can browse our products and place your first order.
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

  return (
    <div className="mt-[137px] mb-[80px] px-6 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-[30px] sm:text-[36px] md:text-[42px] font-bold leading-tight text-secondary-950 mb-[40px]">
        My Orders
      </h1>
      {myOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
        >
          <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span>OrderId : {order._id}</span>
            <span>Payment : {order.paymentType}</span>
            <span>
              Total Amount : {currency}
              {order.amount}
            </span>
          </p>
          {order.items.map((item, index) => (
            <div
              key={index}
              className={`relative bg-background text-secondary-900/70 ${
                order.items.length !== index + 1 && "border-b"
              } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
            >
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-primary-500/10 p-4 rounded-lg">
                  <img
                    src={item.product.image[0]}
                    alt=""
                    className="w-16 h-16"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-medium text-secondary-950">
                    {item.product.name}
                  </h2>
                  <p>Category: {item.product.category}</p>
                </div>
              </div>

              <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
                <p>Quantity: {item.quantity || "1"}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-primary-500 text-lg font-medium">
                Amount: {currency}
                {item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
