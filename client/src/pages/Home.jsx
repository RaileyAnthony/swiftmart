import React from "react";
import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import BestSellers from "../components/BestSellers";
import WhyUs from "../components/WhyUs";

const Home = () => {
  return (
    <div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <MainBanner />
      </div>
      <Categories />
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <BestSellers />
      </div>
      <WhyUs />
    </div>
  );
};

export default Home;
