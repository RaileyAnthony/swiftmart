import { useRef, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Custom hook to detect Tailwind's 2xl screen breakpoint (min-width: 1536px)
const use2xl = () => {
  const [is2xl, setIs2xl] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1536px)");
    const listener = () => setIs2xl(media.matches); // Update state based on match
    listener(); // Set initial value
    media.addEventListener("change", listener); // Listen for screen size changes
    return () => media.removeEventListener("change", listener); // Clean up on unmount
  }, []);

  return is2xl; // Return boolean indicating if screen is 2xl or larger
};

const MainBanner = () => {
  // Refs for custom navigation buttons and Swiper instance
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  // Check if screen size is 2xl
  const is2xl = use2xl();

  // Dynamically select appropriate banner images based on screen size
  const bannerImages = [
    is2xl ? assets.offer1_2xl : assets.offer1,
    is2xl ? assets.offer2_2xl : assets.offer2,
    is2xl ? assets.offer3_2xl : assets.offer3,
  ];

  // Assign custom navigation buttons to Swiper after component mounts
  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params &&
      swiperRef.current.navigation
    ) {
      // Assign refs to Swiper navigation
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      // Reinitialize Swiper navigation to apply changes
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [prevRef, nextRef]);

  return (
    <div className="relative">
      {/* Main layout: two-column on xl+ screens */}
      <div className="mt-[137px] mb-[80px] grid grid-cols-1 xl:grid-cols-2 items-stretch gap-8">
        {/* LEFT SECTION: Textual content and CTA */}
        <div className="bg-primary-500 text-background p-8 lg:p-10 rounded-[20px] flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-[42px] sm:text-[48px] md:text-[54px] font-bold leading-tight">
              Fresh Groceries, Swiftly Delivered to You.
            </h1>
            <p className="text-base sm:text-lg">
              Get everything you need delivered in just minutes, carefully
              handpicked for freshness and quality, all designed to bring
              unmatched convenience right to your doorstep.
            </p>
          </div>
          <div>
            {/* CTA Button navigates to products page */}
            <Link
              to={"/products"}
              onClick={() => window.scrollTo(0, 0)} // Scroll to top on navigation
              className="inline-block bg-secondary-950 text-background rounded-full px-6 py-2.5 text-sm sm:text-base hover:bg-secondary-900 transition"
            >
              Start Shopping
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION: Swiper image carousel */}
        <div className="h-full relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]} // Enable modules
            pagination={{ clickable: true }} // Enable pagination
            autoplay={{ delay: 4000, disableOnInteraction: false }} // Enable auto-slide
            loop={true} // Loop slides infinitely
            className="rounded-2xl w-full h-full"
            onSwiper={(swiper) => {
              swiperRef.current = swiper; // Store swiper instance in ref
            }}
            navigation={{
              prevEl: prevRef.current, // Assign custom navigation buttons
              nextEl: nextRef.current,
            }}
          >
            {/* Render each banner image in a slide */}
            {bannerImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Banner slide ${idx + 1}`}
                  className="rounded-2xl w-full h-full object-cover"
                  loading={idx === 0 ? "eager" : "lazy"} // Eager load first image
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* PREVIOUS BUTTON */}
          <button
            ref={prevRef}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow rounded-full p-2 transition cursor-pointer"
            aria-label="Previous slide"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7" // Left arrow icon
              />
            </svg>
          </button>

          {/* NEXT BUTTON */}
          <button
            ref={nextRef}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow rounded-full p-2 transition cursor-pointer"
            aria-label="Next slide"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7" // Right arrow icon
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
