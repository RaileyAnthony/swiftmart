import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";
import toast from "react-hot-toast";

const SellerLogin = () => {
  // Destructuring necessary state and functions from global context
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();

  // Local state to handle form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handles the login form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevents the default form refresh behavior

    try {
      // Send login credentials to the backend API
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/seller/login`,
        { email, password },
        { withCredentials: true } // Ensures cookies are included in the request
      );

      if (data.success) {
        // If login is successful, set seller status and redirect to dashboard
        setIsSeller(true);
        navigate("/seller");
      } else {
        // Show error message if login fails
        toast.error(data.message);
      }
    } catch (error) {
      // Catch and show any unexpected errors
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Redirect logged-in sellers to the seller dashboard automatically
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    // Only show login form if seller is not already logged in
    !isSeller && (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
        style={{
          backgroundImage: `url(${assets.slogin_bg})`, // Set background image
        }}
      >
        {/* Login form */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-background border border-gray-200 shadow-xl rounded-lg p-6 sm:p-10 flex flex-col gap-5 text-sm text-gray-600"
        >
          <h2 className="text-2xl font-bold text-secondary-950">
            Seller Login
          </h2>

          {/* Email Input Field */}
          <div className="w-full">
            <label className="font-medium block mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              placeholder="e.g. example@gmail.com"
              className="w-full border border-gray-300 rounded p-2 outline-primary-500 text-secondary-900/70"
            />
          </div>

          {/* Password Input Field */}
          <div className="w-full">
            <label className="font-medium block mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded p-2 outline-primary-500 text-secondary-900/70"
            />
          </div>

          {/* Submit Button */}
          <button className="text-sm sm:text-base bg-primary-500 hover:bg-primary-600 text-white w-full py-2 rounded-md transition-all cursor-pointer">
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
