import React from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative">
      <div className="mt-[137px] mb-[80px] grid grid-cols-1 xl:grid-cols-2 items-stretch gap-8">
        {/* Left: Text Content */}
        <div className="bg-primary-500 text-background p-8 lg:p-10 rounded-[20px] flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-[42px] sm:text-[48px] md:text-[54px] font-bold leading-tight">
              Fresh Groceries Delivered Straight to Your Doorstep.
            </h1>
            <p className="text-base sm:text-lg">
              Get everything you need delivered in just minutes, carefully
              handpicked for freshness, backed by reliable service, and designed
              to bring unbeatable convenience straight to your doorstep every
              single time.
            </p>
          </div>
          <div>
            <Link
              to={"/products"}
              className="inline-block bg-secondary-950 text-background rounded-full px-6 py-2.5 text-sm sm:text-base hover:bg-secondary-900 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="h-full">
          <img
            src={assets.main_banner_bg}
            alt="Assorted fresh groceries in a basket"
            className="rounded-2xl w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
