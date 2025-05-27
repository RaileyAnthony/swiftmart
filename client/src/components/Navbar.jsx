import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = () => {
    if (searchQuery.length > 0) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
          setVisible(false);
          setShowDropdown(false); // Close dropdown when navbar hides
        } else {
          setVisible(true);
        }

        if (open && currentScrollY > 100) {
          setOpen(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, open]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest(".profile-dropdown-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 border-t-[10px] border-t-primary-500 bg-background transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <NavLink onClick={() => setOpen(false)} to="/" className="mr-4">
        <img
          className="h-8 xl:h-9 hover:opacity-90"
          src={assets.logo}
          alt="SwiftMart logo"
        />
      </NavLink>
      <div className="flex-1 flex justify-center mx-4">
        <div className="hidden sm:flex items-center text-sm gap-2 border border-gray-300 focus-within:outline-2 focus-within:outline-primary-500 px-3 rounded-full w-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="py-3 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search for products"
            value={searchQuery}
          />
          <button
            onClick={handleSearch}
            className="cursor-pointer p-2 bg-primary-500 hover:bg-primary-600 rounded-full"
          >
            <img src={assets.search_icon} alt="search" className="w-5 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-8 ml-4">
        <NavLink to="/" className="hover:text-primary-500 transition-all">
          Home
        </NavLink>
        <NavLink
          to="/products"
          className="hover:text-primary-500 transition-all"
          onClick={() => window.scrollTo(0, 0)}
        >
          All Products
        </NavLink>

        <div
          onClick={() => {
            navigate("/cart");
            window.scrollTo(0, 0);
          }}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary-500 hover:bg-primary-600 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-6 py-2.5 bg-primary-500 hover:bg-primary-600 transition text-background rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative profile-dropdown-container">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
              className="focus:outline-none"
            >
              <img
                src={assets.profile_icon}
                alt="User profile icon"
                className="w-10 hover:opacity-80 transition-opacity cursor-pointer"
              />
            </button>

            <ul
              className={`${
                showDropdown ? "block" : "hidden"
              } absolute top-12 right-0 bg-white shadow-lg border border-gray-200 py-2 w-40 rounded-md text-sm z-50`}
            >
              <li
                onClick={() => {
                  setShowDropdown(false);
                  navigate("/my-orders");
                  window.scrollTo(0, 0);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 transition-colors"
              >
                My Orders
              </li>
              <li
                onClick={() => {
                  setShowDropdown(false);
                  logout();
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 transition-colors"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 lg:hidden">
        <div
          onClick={() => {
            navigate("/cart");
            window.scrollTo(0, 0);
          }}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="Shopping cart icon"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary-500 hover:bg-primary-600 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
        >
          <img
            src={assets.menu_icon}
            alt="Menu icon"
            className="cursor-pointer"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[63px] z-999 left-0 w-full bg-background shadow-md py-4 flex-col items-start gap-4 px-6 md:px-16 lg:px-24 xl:px-32 text-sm lg:hidden`}
        >
          {/* Mobile Search Bar */}
          <div className="flex sm:hidden items-center w-full gap-2 border border-gray-300 rounded-full px-4 py-2 mb-2">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search for products"
              value={searchQuery}
            />
            <button
              onClick={handleSearch}
              className="cursor-pointer p-1 bg-primary-500 hover:bg-primary-600 rounded-full"
            >
              <img src={assets.search_icon} alt="search" className="w-4 h-4" />
            </button>
          </div>
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="w-full py-2 hover:text-primary-500 text-center"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => {
              setOpen(false);
              window.scrollTo(0, 0);
            }}
            className="w-full py-2 hover:text-primary-500 text-center"
          >
            All Products
          </NavLink>
          {user && (
            <NavLink
              to="/my-orders"
              onClick={() => {
                setOpen(false);
                window.scrollTo(0, 0);
              }}
              className="w-full py-2 hover:text-primary-500 text-center"
            >
              My Orders
            </NavLink>
          )}
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary-500 hover:bg-primary-600 transition text-white rounded-full text-sm m-auto"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary-500 hover:bg-primary-600 transition text-white rounded-full text-sm m-auto"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
