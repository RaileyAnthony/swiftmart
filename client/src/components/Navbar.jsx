import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Navbar = () => {
  // State variables for UI behavior
  const [open, setOpen] = useState(false); // Controls mobile menu visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Tracks scroll position
  const [visible, setVisible] = useState(true); // Controls navbar visibility on scroll
  const [showDropdown, setShowDropdown] = useState(false); // Controls user profile dropdown

  // Get state and functions from context
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

  // Logs the user out and clears user state
  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message); // Show success notification
        setUser(null); // Clear user state
        navigate("/"); // Redirect to homepage
      } else {
        toast.error(data.message); // Show error if logout fails
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Navigates to search results page
  const handleSearch = () => {
    if (searchQuery.length > 0) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setOpen(false); // Close mobile menu if open
    }
  };

  // Allows search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Scroll behavior: hides navbar when scrolling down, shows when scrolling up
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        // Hide navbar if user scrolls down, show if up
        if (currentScrollY > lastScrollY) {
          setVisible(false);
          setShowDropdown(false); // Close dropdown on scroll down
        } else {
          setVisible(true);
        }

        // Close mobile menu on scroll
        if (open && currentScrollY > 100) {
          setOpen(false);
        }

        setLastScrollY(currentScrollY); // Update last scroll position
      }
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, open]);

  // Close dropdown if click occurs outside the profile dropdown container
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
      {/* Logo */}
      <NavLink onClick={() => setOpen(false)} to="/" className="mr-4">
        <img
          className="h-8 xl:h-9 hover:opacity-90"
          src={assets.logo}
          alt="SwiftMart logo"
        />
      </NavLink>

      {/* Search Bar - Desktop Only */}
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

      {/* Desktop Navigation Links */}
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

        {/* Cart Icon with Item Count */}
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

        {/* Conditional rendering based on login status */}
        {!user ? (
          // Login button
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-6 py-2.5 bg-primary-500 hover:bg-primary-600 transition text-background rounded-full"
          >
            Login
          </button>
        ) : (
          // User profile dropdown
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

            {/* Dropdown menu */}
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

      {/* Mobile Icons */}
      <div className="flex items-center gap-6 lg:hidden">
        {/* Cart icon - mobile */}
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

        {/* Hamburger Menu Toggle */}
        <button onClick={() => setOpen(!open)} aria-label="Menu">
          <img
            src={assets.menu_icon}
            alt="Menu icon"
            className="cursor-pointer"
          />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[63px] z-999 left-0 w-full bg-background shadow-md py-4 flex-col items-start gap-4 px-6 md:px-16 lg:px-24 xl:px-32 text-sm lg:hidden`}
        >
          {/* Mobile Search */}
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

          {/* Mobile nav links */}
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

          {/* Mobile Login/Logout */}
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
