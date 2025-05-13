import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { assets, categories } from "../assets/assets"; // Import categories from assets.js
import { useLocation, useNavigate } from "react-router-dom";

const AllProducts = () => {
  const { products, setSearchQuery } = useAppContext(); // Access setSearchQuery from global context
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState(""); // Local state for sidebar search
  const [activeCategory, setActiveCategory] = useState(""); // State for selected category
  const [activeCategoryDetails, setActiveCategoryDetails] = useState({
    text: "All Products",
    text2: "Browse all your grocery essentials in one place.",
  }); // State for category details
  const [sortOption, setSortOption] = useState("alphabetical"); // State for sorting option

  const location = useLocation();
  const navigate = useNavigate(); // To update the URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  // Filter products based on sidebar search query, category, and sorting
  useEffect(() => {
    let filtered = products;

    // Apply global search query filter (from Navbar)
    if (searchQuery.length > 0) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sidebar search query filter
    if (sidebarSearchQuery.length > 0) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(sidebarSearchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeCategory) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === activeCategory.toLowerCase()
      );

      // Update category details
      const selectedCategory = categories.find(
        (category) =>
          category.path.toLowerCase() === activeCategory.toLowerCase()
      );
      if (selectedCategory) {
        setActiveCategoryDetails({
          text: selectedCategory.text,
          text2: selectedCategory.text2,
        });
      }
    } else {
      // Reset to default when no category is selected
      setActiveCategoryDetails({
        text: "All Products",
        text2: "Browse all your grocery essentials in one place.",
      });
    }

    // Apply sorting
    if (sortOption === "alphabetical") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "ascending-price") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "descending-price") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, sidebarSearchQuery, activeCategory, sortOption]);

  const handleSidebarSearch = () => {
    // Trigger filtering when the search button is clicked
  };

  const handleSidebarKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSidebarSearch();
    }
  };

  const handleRefresh = () => {
    // Reset all filters and search queries
    setSidebarSearchQuery(""); // Reset sidebar search input
    setActiveCategory(""); // Show all categories again
    setSortOption("alphabetical"); // Reset sorting
    setSearchQuery(""); // Reset navbar search input
    navigate(location.pathname); // Remove the 'search' query parameter from the URL
  };

  return (
    <div className="mt-[137px] mb-[80px] flex flex-col px-4 md:px-8 lg:px-16 xl:px-24">
      {/* Page Header */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[42px] font-bold leading-tight text-center md:text-left text-secondary-950">
          {activeCategoryDetails.text}
        </h1>
        <p className="text-center md:text-left text-base md:text-lg text-secondary-950">
          {activeCategoryDetails.text2}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-gray-100/40 p-4 rounded-lg shadow h-auto md:h-[70vh] md:sticky top-24 overflow-y-auto border border-gray-300">
          <div className="flex items-center justify-between mb-4 md:flex-col md:items-start md:gap-3 lg:flex-row">
            <h3 className="text-xl md:text-xl font-medium text-secondary-950">
              Filter Products
            </h3>
            <button
              onClick={handleRefresh}
              className="py-2 px-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 cursor-pointer text-sm"
            >
              Refresh
            </button>
          </div>

          {/* Sidebar Search Bar */}
          <div className="flex items-center bg-background text-sm gap-2 border border-gray-300 focus-within:outline-2 focus-within:outline-primary-500 px-3 rounded mb-4 w-full">
            <input
              onChange={(e) => setSidebarSearchQuery(e.target.value)}
              onKeyDown={handleSidebarKeyPress}
              className="p-2 w-full outline-none placeholder-gray-500 text-base"
              type="text"
              placeholder="Search for products"
              value={sidebarSearchQuery} // Binds to the local sidebar state
            />
            <img
              src={assets.search_icon2}
              alt="search"
              className="w-5 h-5 opacity-50"
            />
          </div>

          {/* Sorting Options */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-3">Sort By</h4>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-gray-500 rounded cursor-pointer bg-background outline-primary-500"
            >
              <option value="alphabetical">Alphabetical</option>
              <option value="ascending-price">Price: Low to High</option>
              <option value="descending-price">Price: High to Low</option>
            </select>
          </div>

          {/* Category Filters */}
          <h4 className="text-sm font-medium mb-3">Filter by Category</h4>
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded cursor-pointer ${
                  activeCategory === ""
                    ? "bg-primary-500 text-background"
                    : "bg-background text-secondary-950"
                }`}
                onClick={() => setActiveCategory("")}
              >
                All Categories
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.path}>
                <button
                  className={`w-full text-left py-2 px-4 rounded cursor-pointer ${
                    activeCategory === category.path
                      ? "bg-primary-500 text-white"
                      : "bg-white text-secondary-950"
                  }`}
                  onClick={() => setActiveCategory(category.path)}
                >
                  {category.text}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
