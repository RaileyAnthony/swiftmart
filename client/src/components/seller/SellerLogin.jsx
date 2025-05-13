import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/seller/login`,
        { email, password },
        { withCredentials: true }
      );
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
        style={{
          backgroundImage: `url(${assets.slogin_bg})`,
        }}
      >
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-background border border-gray-200 shadow-xl rounded-lg p-6 sm:p-10 flex flex-col gap-5 text-sm text-gray-600"
        >
          <h2 className="text-2xl font-bold text-center text-primary-500">
            Seller Login
          </h2>
          <div className="w-full">
            <label className="font-medium block mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. example@gmail.com"
              className="w-full border border-gray-300 rounded p-2 outline-primary-500 text-secondary-900/70"
            />
          </div>
          <div className="w-full">
            <label className="font-medium block mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded p-2 outline-primary-500 text-secondary-900/70"
            />
          </div>
          <button className="text-sm sm:text-base bg-primary-500 hover:bg-primary-600 text-white w-full py-2 rounded-md transition-all">
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
