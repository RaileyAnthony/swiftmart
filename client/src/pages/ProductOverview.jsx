import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductOverview = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      // Filter by category and exclude the current product
      productsCopy = productsCopy.filter(
        (item) => product.category === item.category && item._id !== id
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products, id]); // Add id as a dependency

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  return (
    product && (
      <div className="mt-[137px] px-6 md:px-16 lg:px-24 xl:px-32">
        <p>
          <Link to={"/"}>Home</Link> &gt;<Link to={"/products"}> Products</Link>{" "}
          &gt;{" "}
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {product.category}
          </Link>{" "}
          &gt; <span className="text-primary-500"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-secondary-900/30 rounded-[10px] overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-secondary-900/30 max-w-100 rounded-[10px] overflow-hidden">
              <img src={thumbnail} alt="Selected product" />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-[32px] font-bold">{product.name}</h1>

            <div className="mt-6">
              <p className="text-secondary-900/70 line-through">
                MRP: {currency}
                {product.price}
              </p>
              <p className="text-2xl font-medium">
                MRP: {currency}
                {product.offerPrice}
              </p>
              <span className="text-secondary-900/70">
                (inclusive of all taxes)
              </span>
            </div>

            <p className="text-base font-medium mt-6">Product Summary</p>
            <ul className="list-disc ml-4 text-secondary-900/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full py-3.5 cursor-pointer font-medium bg-accent text-primary-500 hover:bg-primary-500/50 hover:text-background transition rounded-full"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-primary-500 text-background hover:bg-primary-600 transition rounded-full"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-20">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold leading-tight">
              Related Products
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:grid-cols-5 mt-10 w-full">
            {relatedProducts
              .filter((product) => product.inStock)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="mx-auto cursor-pointer px-12 my-10 py-2.5 border rounded-full text-primary-500 hover:bg-primary-500/10 transition"
          >
            See All Products
          </button>
        </div>
      </div>
    )
  );
};

export default ProductOverview;
