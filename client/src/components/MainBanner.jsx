import React, { useRef, useEffect } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const bannerImages = [assets.offer1, assets.offer2, assets.offer3];

const MainBanner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params &&
      swiperRef.current.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [prevRef, nextRef]);

  return (
    <div className="relative">
      <div className="mt-[137px] mb-[80px] grid grid-cols-1 2xl:grid-cols-2 items-stretch gap-8">
        {/* Left: Text Content */}
        <div className="bg-primary-500 text-background p-8 lg:p-10 rounded-[20px] flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-[42px] sm:text-[48px] md:text-[54px] font-bold leading-tight">
              Fresh Groceries, Swiftly Delivered to You.
            </h1>
            <p className="text-base sm:text-lg">
              Get everything you need delivered in just minutes, carefully
              handpicked for freshness and quality, all designed to bring
              unmatched convenience and comfort right to your doorstep, faster,
              easier, and more reliably than ever.
            </p>
          </div>
          <div>
            <Link
              to={"/products"}
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block bg-secondary-950 text-background rounded-full px-6 py-2.5 text-sm sm:text-base hover:bg-secondary-900 transition"
            >
              Start Shopping
            </Link>
          </div>
        </div>
        {/* Right: Swiper Slider with working custom buttons */}
        <div className="h-full relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="rounded-2xl w-full h-full"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
          >
            {bannerImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Banner slide ${idx + 1}`}
                  className="rounded-2xl w-full h-full object-cover"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Previous Button */}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* Custom Next Button */}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
