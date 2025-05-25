import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();
  const navigate = useNavigate(); // <-- initialize navigate

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

  return (
    <div className="mt-[137px] mb-[80px] px-6 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-[30px] sm:text-[36px] md:text-[42px] font-bold leading-tight text-secondary-950 mb-[40px]">
        My Orders
      </h1>
      {myOrders.length === 0 ? (
        <div className="flex flex-col items-start justify-center min-h-[200px]">
          <h2 className="text-secondary-950 text-[24px] sm:text-[28px] md:text-[32px] font-semibold leading-tight mb-[8px]">
            You have no orders yet
          </h2>
          <p className="text-secondary-950 text-base sm:text-lg mb-10">
            Your orders will appear here once you make a purchase.
          </p>
          <button
            className="bg-primary-500 text-background px-6 py-2.5 rounded-full font-semibold hover:bg-primary-600 transition cursor-pointer"
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        myOrders.map((order, index) => (
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
        ))
      )}
    </div>
  );
};

export default MyOrders;
