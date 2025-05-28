import logo from "./logo.svg";
import slogin_bg from "./slogin_bg.jpg";
import whyUs_bg from "./whyUs_bg.png";
import categories_bg from "./categories_bg.png";
import search_icon from "./search_icon.svg";
import search_icon2 from "./search_icon2.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import cart_icon from "./cart_icon.svg";
import nav_cart_icon from "./nav_cart_icon.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.svg";
import menu_icon from "./menu_icon.svg";
import delivery_truck_icon from "./delivery_truck_icon.svg";
import leaf_icon from "./leaf_icon.svg";
import coin_icon from "./coin_icon.svg";
import box_icon from "./box_icon.svg";
import trust_icon from "./trust_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import main_banner_bg from "./main_banner_bg.png";
import offer1 from "./offer1.png";
import offer1_2xl from "./offer1_2xl.png";
import offer2 from "./offer2.png";
import offer2_2xl from "./offer2_2xl.png";
import offer3 from "./offer3.png";
import offer3_2xl from "./offer3_2xl.png";
import add_address_image from "./add_address_image.svg";
import organic_vegetable_image from "./organic_vegetable_image.png";
import fresh_fruits_image from "./fresh_fruits_image.png";
import dairy_product_image from "./dairy_product_image.png";
import bakery_image from "./bakery_image.png";
import grain_image from "./grain_image.png";

export const assets = {
  logo,
  offer1,
  offer1_2xl,
  offer2,
  offer2_2xl,
  offer3,
  offer3_2xl,
  search_icon2,
  whyUs_bg,
  bakery_image,
  grain_image,
  categories_bg,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  cart_icon,
  nav_cart_icon,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  delivery_truck_icon,
  leaf_icon,
  coin_icon,
  trust_icon,
  black_arrow_icon,
  white_arrow_icon,
  main_banner_bg,
  add_address_image,
  box_icon,
  slogin_bg,
};

export const categories = [
  {
    text: "Baked Delights",
    text2: "Soft and freshly baked breads, pastries, and more",
    path: "Bakery",
    image: bakery_image,
    bgColor: "#FFFCFA",
  },
  {
    text: "Organic Fruits",
    text2: "Fresh and naturally sweet seasonal fruits",
    path: "Fruits",
    image: fresh_fruits_image,
    bgColor: "#FFFCFA",
  },
  {
    text: "Dairy Goods",
    text2: "Fresh and nutritious dairy essentials for everyday use",
    path: "Dairy",
    image: dairy_product_image,
    bgColor: "#FFFCFA",
  },
  {
    text: "Fresh Vegetables",
    text2: "Fresh and healthy organic vegetables",
    path: "Vegetables",
    image: organic_vegetable_image,
    bgColor: "#FFFCFA",
  },
  {
    text: "Grain Products",
    text2: "Nutritious and wholesome grains and cereals for daily meals",
    path: "Grains",
    image: grain_image,
    bgColor: "#FFFCFA",
  },
];

export const footerLinks = [
  {
    title: "Shopping Categories",
    links: [
      { text: "All Products", url: "/products" },
      { text: "Baked Delights", url: "/products/bakery" },
      { text: "Organic Fruits", url: "/products/fruits" },
      { text: "Dairy Goods", url: "/products/dairy" },
      { text: "Fresh Vegetables", url: "/products/vegetables" },
      { text: "Grain Products", url: "/products/grains" },
    ],
  },
  {
    title: "Webstore Inquiries",
    links: [
      { text: "Madinat Zayed, behind Al Dhafra Mall" },
      { text: "webstore@swiftmart.com" },
      { text: "+971 800 1234" },
      { text: "Mon to Thur from 08:00 to 16:00" },
      { text: "Fri from 07:30 to 12:00" },
    ],
  },
];

export const features = [
  {
    icon: delivery_truck_icon,
    title: "Lightning-Fast Delivery",
    description:
      "Experience the convenience of having your groceries delivered right to your doorstep in 30 minutes or less.",
  },
  {
    icon: leaf_icon,
    title: "Always Fresh",
    description:
      "We source our produce directly from local farms and trusted suppliers to ensure every item you receive is crisp, vibrant, and at its peak freshness.",
  },
  {
    icon: coin_icon,
    title: "Best Value",
    description:
      "Enjoy high-quality groceries without breaking the bank—our competitive pricing ensures you get more for your money with every order.",
  },
  {
    icon: trust_icon,
    title: "Customer-Approved",
    description:
      "Join a growing community of over 10,000 satisfied customers who rely on us for consistent service, quality products, and an exceptional shopping experience.",
  },
];
