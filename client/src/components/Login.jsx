import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-999 flex p-6 items-center text-sm text-secondary-950 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-300 bg-background"
      >
        <div className="w-full flex items-center justify-between mb-2">
          <p className="text-2xl font-bold text-secondary-950 text-left">
            {state === "login" ? "Login" : "Sign Up"}
          </p>{" "}
          <button
            type="button"
            aria-label="Close"
            onClick={() => setShowUserLogin(false)}
            className="text-secondary-950 hover:text-primary-500 text-3xl font-bold transition-colors cursor-pointer mb-2"
          >
            ×
          </button>
        </div>

        {state === "register" && (
          <div className="w-full">
            <p className="font-medium">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="e.g. John Doe"
              className="border border-gray-300 text-secondary-900/70 rounded w-full p-2 mt-1 outline-primary-500"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p className="font-medium">Email Address</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="e.g. example@gmail.com"
            className="border border-gray-300 text-secondary-900/70 rounded w-full p-2 mt-1 outline-primary-500"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p className="font-medium">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="border border-gray-300 text-secondary-900/70 rounded w-full p-2 mt-1 outline-primary-500"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary-500 cursor-pointer underline-offset-4 underline"
            >
              Log in
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary-500 cursor-pointer underline-offset-4 underline hover:text-primary-600 transition-colors"
            >
              Sign up
            </span>
          </p>
        )}
        <button className="text-sm sm:text-base bg-primary-500 hover:bg-primary-600 transition-all text-white w-full py-2 rounded-full cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
